var router = require('./instance.js')
var path = require('path')
var format = require('../util/format.js')
var page = require('../controller/page.js')
var React = require('react')
var thunkify = require('thunkify')
var fs = require('fs')
var existsFile = (distFile) => (callback) =>{
  fs.exists(distFile,(exist)=>{
    callback(null,exist)
  })
}
var writeFile = thunkify(fs.writeFile)
var appendFile = thunkify(fs.appendFile)

// 获取webpack生成的页面  生成页面时不重名  防止和发布的页面冲突
var illegalNames = (()=>{
  var pagePath = path.join(process.cwd(),'src','page')
  return fs.readdirSync(pagePath)
})()

// 创建页面
router.post('/api/page/create.json',function *(next){
  try{
    var {body} = this.request
    var search = yield page.find({name:body.name})
    if(search.length>0){
      return this.body = format('有重名的页面')
    }
    if(illegalNames.indexOf(body.name)!==-1){
      return this.body = format('非法的页面名称')
    }
    var result = yield page.create(body)
    this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

// 保存页面
router.post('/api/page/update.json',function *(next){
  try{
    var {_id,list,globalStyle,desc} = this.request.body
    var result =yield page.update({_id,list,globalStyle,desc})
    this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

// 发布页面
var Page = require('../../src/widget/page')
var getPage = require('../util/getPage.js')
router.post('/api/page/createHtml.json',function *(next){
  try{
    var ReactDOMServer = require('react-dom/server')
    var {body} = this.request
    if(!body._id){
      return this.body = format("请输入id")
    }
    var result = yield page.find({_id:body._id})
    if(result.length===0){
      return this.body = format('没有找到相应page')
    }
    result = result[0]

    var html=getPage(
      ReactDOMServer.renderToString(<Page list={result.list}/>),
      result.globalStyle,
      result.name
    )
    var distFile = path.join(process.cwd(),'dist',result.name+'.html')
    if(yield existsFile(distFile)){
      yield writeFile(distFile,html,'utf8')
    }else{
      yield appendFile(distFile,html,'utf8')
    }
    this.body = format(null,'页面发布成功')
  }catch(e){
    this.body = format(e)
  }
})

// 页面详情
router.get('/api/page/detail.json',function *(next){
  try{
    var {query} = this.request
    if(!query._id){
      return this.body = format('请填写_id')
    }
    var search = yield page.find({_id:query._id})
    if(search.length === 0){
      return this.body = format('有重名的页面')
    }
    return this.body = format(null,search[0])
  }catch(e){
    this.body = format(e)
  }
})

// 页面列表
router.get('/api/page/short.json',function *(next){
  try{
    var result = yield page.find({},{updateTime:1,name:1,createTime:1,desc:1})
    this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

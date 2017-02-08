var router = require('./instance.js')
var path = require('path')
var format = require('../util/format.js')
var page = require('../controller/page.js')
var React = require('react')
var thunkify = require('thunkify')
var fs = require('fs')
var existsFile = thunkify(fs.exists)
var writeFile = thunkify(fs.writeFile)
var appendFile = thunkify(fs.appendFile)

var illegalNames = (()=>{
  var pagePath = path.join(process.cwd(),'src','page')
  return fs.readdirSync(pagePath)
})()

router.post('/api/page/create.json',function *(next){
  try{
    var {body} = this.request
    var search = yield page.find({name:body.name})
    if(search.length>0){
      return this.body = format('有重名的页面')
    }
    if(illegalNames.indexOf(name)!=='-1'){
      return this.body = format('非法的页面名称')
    }
    var result = yield page.create(body)
    this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

var Page = require('../../src/widget/page');
var getPage = require('../util/getPage.js')

router.get('/api/page/createHtml.json',function *(next){
  try{
    var ReactDOMServer = require('react-dom/server')
    var {query} = this.request
    if(!query._id){
      return this.body = format("请输入id")
    }
    var result = yield page.find({_id:query._id})
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

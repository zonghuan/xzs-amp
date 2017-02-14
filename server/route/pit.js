var router = require('./instance.js')
var path = require('path')
var format = require('../util/format.js')
var thunkLess = require('../util/thunkLess.js')
var pit = require('../controller/pit.js')
var _ = require('underscore')

// 创建坑位
router.post('/api/pit/create.json',function *(next){
  try{
    var body = this.request.body
    var search = yield pit.find({name:body.name})
    if(search.length>0){
      return this.body = format('有重名的模块')
    }
    if(this.session.user){
      body.author = this.session.user.name
    }
    var result = yield pit.create(body)
    return this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

// 更新坑位
router.post('/api/pit/update.json',function *(next){
  try{
    var body = this.request.body
    if(!this.session.user){
      return this.body = format('没有用户信息，请重新登陆')
    }
    var pits = yield pit.find({_id:body._id,author:this.session.user.name})
    if(pits.length > 0){
      var result = yield pit.update(body)
      this.body = format(null,result)
    }else{
      this.body = format('你不是改模块的创建者，不能修改')
    }
  }catch(e){
    this.body = format(e)
  }
})

// 根据坑位id和数据  获取生成的html
var mock = require('../util/mockData.js')
router.get('/api/pit/html.json',function *(next){
  try{
    var query = this.request.query
    var result = yield pit.find({_id:query.pit})
    if(result.length>0){
      var wrapName=`n${+new Date}`
      var outputLess = yield thunkLess(`.${wrapName}{${result[0].css}}`)
      var html = _.template(`<div class="${wrapName}">${result[0].html}</div>`)({list:mock})
      this.body=format(null,`<style>${outputLess.css}</style>${html}`)
    }else{
      this.body = format('坑位ID有误')
    }
  }catch(e){
    this.body = format(e)
  }
})

router.get('/api/pit/short.json',function *(next){
  try{
    var result = yield pit.find({},{url:1,name:1,author:1})
    this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

// 获取坑位详情
router.get('/api/pit/detail.json',function *(next){
  try{
    var query = this.request.query
    var result = yield pit.find({_id:query.pit})
    if(result.length > 0){
      this.body = format(null, result[0])
    }else{
      this.body = format('坑位信息输入不合法')
    }
  }catch(e){
    this.body = format(e)
  }
})

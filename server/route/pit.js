var router = require('./instance.js')
var path = require('path')
var format = require('../util/format.js')
var thunkLess = require('../util/thunkLess.js')
var pit = require('../controller/pit.js')
var _ = require('underscore')

router.post('/api/pit/create.json',function *(next){
  try{
    var body = this.request.body
    var search = yield pit.find({name:body.name})
    if(search.length>0){
      return this.body = format('有重名的模块')
    }
    var result = yield pit.create(body)
    return this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

var mock = require('../util/mockData.js')
router.get('/api/pit/html.json',function *(next){
  try{
    var query = this.request.query
    var result = yield pit.find({_id:query.pit})
    if(result.length>0){
      var outputLess = yield thunkLess(`.${result[0].name}{${result[0].css}}`)
      var html = _.template(`<div class="${result[0].name}">${result[0].html}</div>`)({list:mock})
      this.body=format(null,{code:1,result:`<style>${outputLess.css}</style>${html}`})
    }else{
      this.body = format('坑位ID有误')
    }
  }catch(e){
    this.body = format(e)
  }
})

router.get('/api/pit/short.json',function *(next){
  try{
    var result = yield pit.find({},{url:1,name:1})
    this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

var router = require('./instance.js')
var path = require('path')
var format = require('../util/format.js')
var page = require('../controller/page.js')

router.post('/api/page/create.json',function *(next){
  try{
    var {body} = this.request
    var search = yield page.find({name:body.name})
    if(search.length>0){
      return this.body = format('有重名的页面')
    }
    var result = yield page.create(body)
    this.body = format(null,result)
  }catch(e){
    this.body = format(e)
  }
})

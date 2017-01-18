var router = require('./instance.js')
var path = require('path')
var format = require('../util/format.js')
var pit = require('../controller/pit.js')

router.post('/api/pit/create',function *(next){
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

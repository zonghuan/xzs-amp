var router = require('./instance.js')
var format = require('../util/format.js')
var format = require('../util/format.js')
var _ = require('underscore')

var getPage = require('../util/getPage.js')

var pit = require('../controller/pit.js')
var thunkLess = require('../util/thunkLess.js')
var mockList = require('../util/mockData.js')

router.get('/api/preview.json',function *(next){
  this.set('Content-Type','text/html')
  var query = this.request.query
  try{
    var result = yield pit.find({_id:query.pit})

    if(result.length > 0){
      var outputLess = yield thunkLess(`.${result[0].name}{${result[0].css}}`)
      var html = _.template(`<div class="${result[0].name}">${result[0].html}</div>`)({list:mockList})
      this.body=getPage(`<style>${outputLess.css}</style>${html}`)
    }else{
      this.body = getPage('找不到模块')
    }

  }catch(e){
    this.body = getPage(e.toString())
  }
})

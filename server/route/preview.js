var router = require('./instance.js')
var path = require('path')
var format = require('../util/format.js')
var fs = require('fs')
var format = require('../util/format.js')
var path = require('path')
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
    var outputLess = yield thunkLess(`.${result[0].name}{${result[0].css}}`)
    var html = _.template(`<div class="${result[0].name}">${result[0].html}</div>`)({list:mockList})
    this.body=getPage(`<style>${outputLess.css}</style>${html}`)
  }catch(e){
    this.body=format(e)
  }
})

var router = require('./instance.js')
var path = require('path')
var format = require('../util/format.js')
var fs = require('fs')
var format = require('../util/format.js')
var path = require('path')
var _ = require('underscore')

var nodeModulesPath=path.join(process.cwd(),'node_modules')
var zeptoPath = path.join(nodeModulesPath,'zepto/dist/zepto.min.js')
var zeptoJs = fs.readFileSync(zeptoPath)
var remPath = path.join(nodeModulesPath,'dwd-rem/rem.js')
var remJs = fs.readFileSync(remPath)


var getPage = (html) => {
  return (
    `<html>
      <head>
        <title>预览</title>
        <script type="text/javascript">${remJs}</script>
        <script type="text/javascript">${zeptoJs}</script>
        <style>
          body,html{
            background-color:#eee;
            margin:0;
            padding:0;
          }
        </style>
      </head>
      <body>${html}</body>
    </html>`
  )
}

var pit = require('../controller/pit.js')
var thunkLess = require('../util/thunkLess.js')
var mockList = require('../util/mockData.js')

router.get('/api/preview.json',function *(next){
  this.set('Content-Type','text/html')
  var query = this.request.query
  try{
    var result = yield pit.find({_id:query.pit})
    var outputLess = yield thunkLess(result[0].css)
    var html = _.template(result[0].html)({list:mockList})
    this.body=getPage(`<style>${outputLess.css}</style>${html}`)
  }catch(e){
    this.body=format(e)
  }
})

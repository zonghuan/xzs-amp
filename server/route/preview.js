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
var thunkLess = (less) => (callback) =>{
  return require('less').render(
    less,
    {
      globalVars:{
        base:750/10+"rem"
      }
    },
    callback)
}

var mockList = [{
  iscountPrice:19900,
  discountPriceYuanString:"199.00",
  feature:null,
  inventory:1,
  itemId:10204457,
  picUrl:"http://img.xianzaishi.com/2/1484054198499_500_676.jpg",
  price:19900,
  priceYuanString:"199.00",
  sku:"11191",
  subtitle:"水果礼盒",
  title:"果物满满水果礼盒"
}]


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

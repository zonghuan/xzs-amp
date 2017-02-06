var koa=require('koa')
var app=koa()
var proxy = require('koa-proxy2')
var config=require('../config.json')
var isDebug=process.env.NODE_ENV==='development'
var bodyParser = require('koa-body');
var send=require('koa-send')
var path=require('path')
var url = require('url')

app.use(
  bodyParser({
    formidable:{
      uploadDir: path.join(process.cwd(),'dist'),
      keepExtensions:true
    },
    formLimit:"1024kb",
    multipart:true
  })
)

app.use(function *(next){
  var pathname = url.parse(this.request.url).pathname
  if(/\.json$/.test(pathname)){
    this.set('Content-Type','application/json;charset=utf-8')
  }
  yield next
})

var router=require('./route')
app.use(router.routes())
  .use(router.allowedMethods());

if(isDebug){
  app.use(proxy({
    proxy_rules:[
      {
        proxy_location: /(?:\.html)|(?:\.js)|(?:\.css)$/,
        proxy_pass:"http://localhost:"+config.front,
        proxy_micro_service: false,
        proxy_merge_mode: false
      }
    ]
  }))
}
app.use(require('koa-static')('dist'))

app.listen(config.port,()=>{
  console.log('listening on '+config.port)
})

var koa=require('koa')
var app=koa()
var proxy = require('koa-proxy2')
var config=require('../config.json')
var isDebug=process.env.NODE_ENV==='development'
var bodyParser = require('koa-bodyparser');
var send=require('koa-send')
var path=require('path')

app.use(bodyParser({
  formLimit:'1024kb'
}))

var router=require('./route')
app.use(router.routes())
  .use(router.allowedMethods());

if(!isDebug){
  app.use(require('koa-static')('dist'))
}else{
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
app.use(function *(next){
  var rootPath='resource';
  var urlPath=this.path;
  if(urlPath.indexOf(rootPath)!==-1){
    yield send(this, urlPath.replace(rootPath+'/',''), { root: path.join(process.cwd(),rootPath) });
  }else{
    yield next;
  }
})

app.listen(config.port,()=>{
  console.log('listening on '+config.port)
})

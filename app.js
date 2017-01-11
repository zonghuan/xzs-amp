var koa=require('koa')
var app=koa()
var proxy = require('koa-proxy2')
var config=require('./config.json')
var isDebug=process.env.NODE_ENV==='development'

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

app.listen(config.port,()=>{
  console.log('listening on '+config.port)
})

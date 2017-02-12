var router=require('koa-router')()
var loginToken=require('../util/loginToken.js')

router.post('/api/login.json',function *(next){
  var {body} = this.request
  try{
    var res = yield loginToken(body,process.env.NODE_ENV!=='development')
    var resBody = JSON.parse(res[1])
    if(resBody.success){
      this.session.user=resBody.module
    }
    this.body=res[1]
  }catch(e){
    this.body=e.toString()
  }
})

module.exports=router

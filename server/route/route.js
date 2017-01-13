var router=require('koa-router')()

router.post('/api/upload.json',function *(next){
  this.body=this.request.body;
})

module.exports=router

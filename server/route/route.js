var router=require('koa-router')()

router.get('/api/upload.json',function *(next){
  this.body='abc';
})

module.exports=router

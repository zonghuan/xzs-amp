var router=require('koa-router')()

router.post('/api/upload.json',function *(next){
  console.log(123)
  this.body='abc';
})

module.exports=router

var router=require('koa-router')()
var path=require('path')
var format=require('../util/format.js')
router.post('/api/upload.json',function *(next){
  const info=this.request.body.files.filename;
  const imgPath='resource/'+path.basename(info.path);
  this.body=format(null,imgPath);
})

module.exports=router

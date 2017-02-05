var router=require('./instance.js')
var path=require('path')
var format=require('../util/format.js')

router.post('/api/upload.json',function *(next){
  const info=this.request.body.files.filename;
  const imgPath=path.basename(info.path);
  this.body=format(null,imgPath);
})

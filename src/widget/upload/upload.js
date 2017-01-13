import "./upload.less"

export default (file,callback)=>{
  file.wrap('<div class="upload"></div>')
  file.addClass('upload-input')
  file.attr('accept','image/png,image/jpg,image/jpeg,image/git')

  var wrap=file.parent()
  wrap.append('<i class="iconfont">&#xe739;</i>上传文件')
  file.on('change',function(e){
    var element=$(this)
    var formData=new FormData();
    formData.append('filename',element[0].files[0])
    var promise=$.ajax({
      url:'/api/upload.json',
      method:'post',
      processData:false,
      contentType: false,
      data:formData
    })
    promise.done(result=>{
      result=JSON.parse(result)
      if(result.code==1){
        wrap.css('background-image',`url(${result.msg})`)
        callback(result.msg)
      }
    });
    promise.fail(e=>{
      console.log(e.toString())
    })
  })
}

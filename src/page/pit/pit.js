import _ from 'underscore'
import "widget/common"
import createNav from 'widget/nav'
import html from './pit.html'
import "./pit.less"
import "codemirror/lib/codemirror.css"
import CodeMirror from 'codemirror/lib/codemirror.js'
import "codemirror/mode/htmlembedded/htmlembedded.js"
import "codemirror/mode/css/css.js"
import upload from 'widget/upload'

const content=$('#content')
content.append(createNav('pit'))
content.append(html)


$(()=>{
  var htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlEditor'),{
    lineNumbers: true,
    mode:'application/x-ejs'
  });
  var lessEditor = CodeMirror.fromTextArea(document.getElementById('lessEditor'),{
    lineNumbers: true,
    matchBrackets:true,
    mode:'text/x-less'
  });
  upload($('#pitImg'),img=>{
    var review=$('#pitImgReview')
    if(review.find('img').length===0){
      return review.append(`<img src="${img}" />`)
    }
    var img=review.find('img')
    img.attr('src',img)
  },'上传预览图')


  $('#save').on('click',function(e){
    var html = htmlEditor.getValue()
    var css = lessEditor.getValue()
    var name = $('#inputName').val()
    var img = $('#pitImgReview').find('img')
    var modal = $('#msgDialog')

    if(!html||!css||!name||img.length===0){
      modal.find('.modal-info').html('坑位信息不全，不能添加')
      return modal.modal('show')
    }

    var promise=$.ajax('/api/pit/create',{
      method:'post',
      data:{
        html,
        css,
        name,
        url:img.attr('src')
      }
    })
    promise.done(result=>{
      if(result.code===1){
        modal.find('.modal-info').html('添加坑位成功')
      }
    })
  })
})

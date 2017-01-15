import _ from 'underscore'
import "widget/common"
import createNav from 'widget/nav'
import html from './pit.html'
import "./pit.less"
import "codemirror/lib/codemirror.css"
import CodeMirror from 'codemirror/lib/codemirror.js'
import "codemirror/mode/htmlembedded/htmlembedded.js"
import "codemirror/mode/css/css.js"


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
})

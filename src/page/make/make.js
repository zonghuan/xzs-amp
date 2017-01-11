import _ from 'underscore'
import {createStore,combineReducers} from 'redux'

import navHtml from './nav.html'
import pageHtml from './page.html'
import "./make.less"


var content=$('#content')

content.append(navHtml)
content.append(pageHtml)

const tabs=$('#rightTab a');
tabs.on('click',function(e){
  e.preventDefault()
  $(this).tab('show')
  const index=$(this).attr('target-index');
  return $('.page-config').hide().eq(index).show()
})

$(()=>{

  tabs.eq(0).trigger('click')

  // 设置


})

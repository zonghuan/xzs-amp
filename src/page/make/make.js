import _ from 'underscore'

import pageHtml from './page.html'
import "./make.less"
import store from './store.js'
import createNav from 'widget/nav'

var content=$('#content')

content.append(createNav('make'))
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
  $('#configColor').on('change',function(e){
    const value=$(e.target).val()
    store.dispatch({type:"background-color",value})
  })

})

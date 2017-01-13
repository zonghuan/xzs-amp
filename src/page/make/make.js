import _ from 'underscore'

import navHtml from './nav.html'
import pageHtml from './page.html'
import "./make.less"
import store from './store.js'
import upload from 'widget/upload'
import localStore from 'widget/store'

const banner=localStore.banner
console.log(banner)

var content=$('#content')

content.append(navHtml)
content.append(pageHtml)

// 右侧tab切换
const tabs=$('#rightTab a');
tabs.on('click',function(e){
  e.preventDefault()
  $(this).tab('show')
  const index=$(this).attr('target-index')
  return $('.page-config').hide().eq(index).show()
})

$(()=>{

  // 右侧tab默认选中第一个
  tabs.eq(1).trigger('click')

  // 设置背景色
  $('#configColor').on('change',function(e){
    const value=$(e.target).val()
    store.dispatch({type:"background-color",value})
  })

  var getFullPath=img=>`http://${window.location.host}/${img}`

  //  设置背景图片
  upload($('#backgroundImg'),(img)=>{
    store.dispatch({type:"background-image",value:`url(${getFullPath(img)})`})
  })

  // 上传banner图
  const container=$('#bannerContainer')
  const createBanner=fullPath=>(
    `<div class="banner-item">
      <a data-url="${fullPath}" href="javascript:void(0);" class="banner-del">x</a>
      <img class="banner-img" src="${fullPath}" />
    </div>`
  )
  var list=banner.get()
  for(var i=0;i<list.length;i++){
    container.append(createBanner(list[i]))
  }
  upload($('#bannerImg'),img=>{
    const fullPath=getFullPath(img)
    banner.set(fullPath)
    container.append(createBanner(fullPath))
  })

  container.on('click','.banner-del',e=>{
    var element=$(e.target)
    var url=element.attr('data-url')
    element.parent().remove()
    banner.del(url)
  })


})

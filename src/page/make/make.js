import _ from 'underscore'

import navHtml from './nav.html'
import pageHtml from './page.html'
import "./make.less"
import store from './store.js'
import upload from 'widget/upload'
import localStore from 'widget/store'

const banner=localStore.banner

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

  var globalIndex=0;
  const pageContent=$('#pageContent')

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
      <img draggable class="banner-img" src="${fullPath}" />
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

  // 删除右侧banner
  container.on('click','.banner-del',e=>{
    var element=$(e.target)
    var url=element.attr('data-url')
    element.parent().remove()
    banner.del(url)
  })

  // 拖拽右侧的banner到左边
  var dragItem=null;
  container.on('dragstart','.banner-img',e=>{
    dragItem=e.target
  })
  pageContent.on('dragover',e=>{
    e.preventDefault();
  })
  pageContent.on('drop',e=>{
    store.dispatch({
      type:'banner',
      src:$(dragItem).attr('src'),
      index:globalIndex++
    })
  })

  pageContent.on('click','.page-pannel-del',e=>{
    console.log(123)
    var element=$(e.target)
    store.dispatch({
      type:'banner-del',
      index:element.attr('data-index')
    })
  })

})

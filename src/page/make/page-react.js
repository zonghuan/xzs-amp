import React from 'react'
import './make.less'
import Upload from 'widget/upload/upload-react.js'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Store from 'widget/store'
import Page from 'widget/page'

import PitModal from './pit-modal.js'

var {bannerStore} = Store

//各种事件
var eventGroup = {
  changeGlobal(globalStyle){
    this.setState({globalStyle})
  },
  uploadBackgroundImage(result){
    var {globalStyle} = this.state
    globalStyle = Object.assign({},globalStyle)
    globalStyle.backgroundImage = result?`url(${result})`:'none'
    this.setState({globalStyle})
  },
  uploadBanner(result){
    var {banners} = this.state
    banners = Object.assign([],banners)
    banners.push(result)
    this.setState({banners})
    bannerStore.set(result)
  },
  // 右侧删除banner
  delectBanner(img){
    var {banners} = this.state
    this.setState({banners:banners.filter(image=>image!=img)})
    bannerStore.del(img)
  },
  // 拖拽右侧的banner
  dragBanner(e,img){
    e.dataTransfer.setData("item",JSON.stringify({type:'banner',img}))
  },
  // 拖拽右侧的坑位
  dragPit(e,pit){
    e.dataTransfer.setData('item',JSON.stringify({type:'pit',pit}))
  },
  // 拖放右侧东西到左侧的页面上
  dropPage(e){
    var item = e.dataTransfer.getData("item")
    if(item){
      var {list} = this.state
      list = Object.assign([],list)
      item = JSON.parse(item)

      //  拖放banner
      if(item.type === 'banner'){
        list.push(item)
      }
      // 拖放坑位 弹出对话框  要求输入商品id
      if(item.type === 'pit'){
        this.setState({pitModal:true,pitModalData:item.pit})
      }
      this.setState({list})
    }
  },
  appendPit(e){
    var list = Object.assign([],this.state.list)
    var result = Object.assign({},e)
    result.type = 'pit'
    list.push(result)
    this.setState({list})
  },
  // 左侧删除banner
  deletePageBanner(index){
    this.setState({list:this.state.list.filter((item,idx)=>idx!==index)})
  },

  // 右侧点击切换tab
  changeTab(tab){
    this.setState({tab})
  }
}

// 生命周期
var lifeGroup = {
  getInitialState(){
    return {
      tab:2,
      banners:[],
      pits:[],

      pitModal:false,
      pitModalData:{},

      list:[],
      globalStyle:{
        "backgroundColor":'#ffffff',
        'backgroundImage':''
      }

    }
  },
  componentDidMount(){
    this.setState({banners:bannerStore.get()})

    // 获取坑位简洁列表
    var promise = $.ajax('/api/pit/short.json')
    promise.done(result=>{
      if(result.code===1){
        this.setState({pits:result.msg})
      }
    })

  },

  render(){

    var {
      globalStyle,tab,banners,list,pits,
      pitModal,pitModalData
    } = this.state

    return (
      <div className="page">
        <div className="page-left">
          <div className="page-make">
            <div id="pageContent" onDragOver={e=>e.preventDefault()} onDrop={e=>this.dropPage(e)} style={globalStyle}>
              <Page list={list} onDeleteBanner={e=>this.deletePageBanner(e)}/>
            </div>
          </div>
        </div>
        <div className="page-right">
          <Nav className="nav nav-tabs nav-right" activeKey={tab} onSelect={e=>{this.changeTab(e)}}>
            <NavItem eventKey={0}>页面设置</NavItem>
            <NavItem eventKey={1}>banner设置</NavItem>
            <NavItem eventKey={2}>坑位设置</NavItem>
          </Nav>
          {tab===0&&<div className="page-config">
            <form className="form-horizontal" role="form">
              <div className="form-group">
                <label className="col-sm-3 control-label">背景色</label>
                <div className="col-sm-9">
                  <input type="color" value={globalStyle.backgroundColor} onChange={e=>{this.changeGlobal({"backgroundColor":e.target.value})}} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">背景图片</label>
                <div className="col-sm-9">
                  <Upload onUpload={e=>{this.uploadBackgroundImage(e)}}/>
                </div>
              </div>
            </form>
          </div>}
          {tab===1&&<div className="page-config">
            <div className="form-group">
              <div className="page-banner">
                <Upload placeholder="上传banner" onUpload={e=>{this.uploadBanner(e)}} />
              </div>
              <div className="banner-container">
                {banners.map(img=>(
                  <div key={img} className="banner-item">
                    <a className="banner-del" onClick={e=>{this.delectBanner(img)}}>x</a>
                    <img draggable onDragStart={e=>this.dragBanner(e,img)} className="banner-img" src={img} />
                  </div>
                ))}
              </div>
            </div>
          </div>}
          {tab===2&&<div className="page-config">
            <div className="page-pits">
              {pits.map(item=>(
                <div key={item.name} className="page-pits-wrap">
                  <span>模块名称 : {item.name}</span>
                  <img draggable src={item.url} onDragStart={e=>this.dragPit(e,item)}/>
                </div>
              ))}
            </div>
          </div>}
        </div>
        <PitModal
          pitModalData = {pitModalData}
          pitModal = {pitModal}
          onHide = {e=>this.setState({pitModal:false})}
          onSuccess = {e=>this.appendPit(e)}
        />
      </div>
    )
  }
}

export default React.createClass(Object.assign({},eventGroup,lifeGroup))

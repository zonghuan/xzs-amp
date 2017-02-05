import React from 'react'
import './make.less'
import Upload from 'widget/upload/upload-react.js'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Store from 'widget/store'
import Page from 'widget/page'

var {bannerStore} = Store

export default React.createClass({
  getInitialState(){
    return {
      tab:1,
      banners:[],
      list:[],
      global:{
        "backgroundColor":'#ffffff',
        'backgroundImage':''
      }

    }
  },
  componentDidMount(){
    this.setState({banners:bannerStore.get()})
  },
  changeGlobal(global){
    this.setState({global})
  },
  uploadBackgroundImage(result){
    var {global} = this.state
    global = Object.assign({},global)
    global.backgroundImage = result?`url(${result})`:'none'
    this.setState({global})
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
  dragBanner(e,img){
    e.dataTransfer.setData("bannerImg",img)
  },
  // 拖放东西到左侧的页面上
  dropPage(e){
    var img = e.dataTransfer.getData("bannerImg")
    var {list} = this.state
    list = Object.assign([],list)
    if(img){
      list.push({type:"banner",img})
    }
    this.setState({list})
  },
  // 左侧删除banner
  deletePageBanner(index){
    this.setState({list:this.state.list.filter((item,idx)=>idx!==index)})
  },
  changeTab(tab){
    this.setState({tab})
  },
  render(){
    var {global,tab,banners,list} = this.state

    return (
      <div className="page">
        <div className="page-left">
          <div className="page-make">
            <div id="pageContent" onDragOver={e=>e.preventDefault()} onDrop={e=>this.dropPage(e)} style={global}>
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
                  <input type="color" value={global.backgroundColor} onChange={e=>{this.changeGlobal({"backgroundColor":e.target.value})}} />
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
                    <img draggable onDragStart={e=>{this.dragBanner(e,img)}} className="banner-img" src={img} />
                  </div>
                ))}
              </div>
            </div>
          </div>}
          {tab===2&&<div className="page-config">
            <div id="pagePits" className="page-pits"></div>
          </div>}
        </div>
      </div>
    )
  }
})

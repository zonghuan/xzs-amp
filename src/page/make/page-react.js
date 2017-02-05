import React from 'react'
import './make.less'
import Upload from 'widget/upload/upload-react.js'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

export default React.createClass({
  getInitialState(){
    return {
      tab:0,
      list:[],
      global:{
        "backgroundColor":'#ffffff',
        'backgroundImage':''
      }
    }
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
  changeTab(tab){
    this.setState({tab})
  },
  render(){
    var {global,tab} = this.state

    return (
      <div className="page">
        <div className="page-left">
          <div className="page-make">
            <div id="pageContent" style={global}></div>
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
                <input type="file" id="bannerImg" />
              </div>
              <div className="banner-container" id="bannerContainer"></div>
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

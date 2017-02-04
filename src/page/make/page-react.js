import React from 'react'
import './make.less'

export default React.createClass({
  getInitialState(){
    return {
      list:[],
      global:{}
    }
  },
  render(){
    return (
      <div className="page">
        <div className="page-left">
          <div className="page-make">
            <div id="pageContent"></div>
          </div>
        </div>
        <div className="page-right">
          <ul className="nav nav-tabs nav-right" id="rightTab" role="tablist">
            <li><a href="#">页面设置</a></li>
            <li><a href="#">banner设置</a></li>
            <li><a href="#">坑位设置</a></li>
          </ul>
          <div className="page-config">
            <form className="form-horizontal" role="form">
              <div className="form-group">
                <label className="col-sm-3 control-label">背景色</label>
                <div className="col-sm-9">
                  <input type="color" value="#ffffff" id="configColor" placeholder="Email" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">背景图片</label>
                <div className="col-sm-9">
                  <input type="file" id="backgroundImg" />
                </div>
              </div>
            </form>
          </div>
          <div className="page-config">
            <div className="form-group">
              <div className="page-banner">
                <input type="file" id="bannerImg" />
              </div>
              <div className="banner-container" id="bannerContainer"></div>
            </div>
          </div>
          <div className="page-config">
            <div id="pagePits" className="page-pits"></div>
          </div>
        </div>
      </div>
    )
  }
})

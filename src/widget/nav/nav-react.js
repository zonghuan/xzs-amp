import React from 'react'

export default React.createClass({
  render(){
    var {select} = this.props
    return (
      <nav className="navbar navbar-default navbar-page" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">活动制作平台</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={select==='make'?'active':''}><a href="/pageList.html">页面</a></li>
              <li className={select==='pit'?'active':''}><a href="/pitList.html">坑位</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
})

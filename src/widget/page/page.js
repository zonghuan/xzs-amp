var React = require('react')
var {bannerStyle,pagePannel,pagePannelDel} = require('./style.js')

module.exports = React.createClass({
  render(){
    var {list,onDeleteBanner} = this.props
    return (
      <div>
        {list.map((item,index)=>{
          if(item.type==='banner'){
            return (
              <div key={index} style={pagePannel}>
                <a style={pagePannelDel} onClick={e=>onDeleteBanner&&onDeleteBanner(index)}>x</a>
                <img style={bannerStyle} src={item.img}/>
              </div>
            )
          }
        })}
      </div>
    )
  }
})

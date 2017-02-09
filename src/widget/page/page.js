var React = require('react')
var {bannerStyle,pagePannel,pagePannelDel} = require('./style.js')

module.exports = React.createClass({
  render(){
    var {list,onDeleteBanner} = this.props
    return (
      <div>
        {list.map((item, index)=>{
          return (
            <div key={index} style={pagePannel}>
              <a className="client-hidden" style={pagePannelDel} onClick={e=>onDeleteBanner&&onDeleteBanner(index)}>x</a>
              {item.type === 'banner'&&(
                <img style={bannerStyle} src={item.img}/>
              )}
              {item.type === 'pit' && (
                <div dangerouslySetInnerHTML={{__html:item.html}}></div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
})

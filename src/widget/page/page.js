var React = require('react')
var {bannerStyle,pagePannel,pagePannelDel} = require('./style.js')

module.exports = React.createClass({
  render(){
    var {list,onDeleteBanner,onEdit,onUp,onDown,onEditBanner} = this.props
    return (
      <div>
        {list.map((item, index)=>{
          if(item.type === 'banner'){
            return (
              <div key={index} style={pagePannel}>
                <a className="client-hidden panel-del btn-xs btn btn-primary" onClick={e=>onDeleteBanner&&onDeleteBanner(index)}>
                  <span className="iconfont">&#xe6b4;</span>删除
                </a>
                <a className="client-hidden panel-edit btn-xs btn btn-primary" onClick={e=>onEditBanner&&onEditBanner(index)}>
                  <span className="iconfont">&#xe649;</span>修改
                </a>
                <a className="client-hidden panel-up btn-xs btn btn-primary" onClick={e=>onUp&&onUp(index)}>
                  <span className="iconfont">&#xe69e;</span>上移
                </a>
                <a className="client-hidden panel-down btn-xs btn btn-primary" onClick={e=>onDown&&onDown(index)}>
                  <span className="iconfont">&#xe69e;</span>下移
                </a>
                {item.bType==1&&(
                  <a data-sku={item.skuId||''} data-item={item.itemId||''} href="javascript:void(0);"><img style={bannerStyle} src={item.img}/></a>
                )}
                {item.bType==2&&(
                  <a href={item.href||'#'}><img style={bannerStyle} src={item.img}/></a>
                )}
                {item.bType==3&&(
                  <div className="backToTop"><img style={bannerStyle} src={item.img}/></div>
                )}
                {[1,2,3].indexOf(parseInt(item.bType||'-100'))===-1&&(
                  <img style={bannerStyle} src={item.img}/>
                )}
              </div>
            )
          }
          if(item.type === 'pit'){
            return (
              <div key={index} style={pagePannel}>
                <a className="client-hidden panel-del btn-xs btn btn-primary" onClick={e=>onDeleteBanner&&onDeleteBanner(index)}>
                  <span className="iconfont">&#xe6b4;</span>删除
                </a>
                <a className="client-hidden panel-edit btn-xs btn btn-primary" onClick={e=>onEdit&&onEdit(item,index)}>
                  <span className="iconfont">&#xe649;</span>修改
                </a>
                <a className="client-hidden panel-up btn-xs btn btn-primary" onClick={e=>onUp&&onUp(index)}>
                  <span className="iconfont">&#xe69e;</span>上移
                </a>
                <a className="client-hidden panel-down btn-xs btn btn-primary" onClick={e=>onDown&&onDown(index)}>
                  <span className="iconfont">&#xe69e;</span>下移
                </a>
                <div dangerouslySetInnerHTML={{__html:item.html}}></div>
              </div>
            )
          }
        })}
      </div>
    )
  }
})

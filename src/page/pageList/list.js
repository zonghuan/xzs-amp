import React from 'react'
import "./list.less"
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import "widget/common"

var formatDate = (str)=>{
  var date = new Date(str)
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+
    ' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
}
export default React.createClass({
  getInitialState(){
    return {
      list:[]
    }
  },
  componentDidMount(){
    var promise = $.ajax('/api/page/short.json')
    promise.done(result=>{
      if(result.code === 1){
        this.setState({list:result.msg})
      }
    })
  },
  render(){
    var {list} = this.state
    return (
      <div className="wrap">
        {list.map(item=>(
          <div key={item.name} className="square">
            <Panel header={"页面名称 : "+item.name} style={{marginBottom:0}}>
              <div className="line">{"标题 : "+(item.desc||'无')}</div>
              <div className="line">{'创建者 : '+ item.author}</div>
              <div className="line">{'创建日期 : '+formatDate(new Date(item.createTime))}</div>
              <div className='line'>
                <a className="btn btn-xs btn-primary" href={`/make.html?id=${item._id}`}>修改</a>
              </div>
            </Panel>
          </div>
        ))}
        <div className="buttons">
          <a className="btn-add btn btn-primary" href='/make.html'>新增页面</a>
        </div>
      </div>
    )
  }
})

import React from 'react'
import "./list.less"
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import Image from 'react-bootstrap/lib/Image'

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
    var promise = $.ajax('/api/pit/short.json')
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
            <Panel header={"坑位名称 : "+item.name}>
              <div className='line'>
                <Image src={item.url} thumbnail/>
              </div>
              <div className='line'>
                <a className="btn btn-xs btn-primary" href={`/pit.html?pit=${item._id}`}>修改</a>
              </div>
            </Panel>
          </div>
        ))}
        <div className="buttons">
          <a className="btn-add btn btn-primary" href='/pit.html'>新增页面</a>
        </div>
      </div>
    )
  }
})

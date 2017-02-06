import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'

export default React.createClass({
  getInitialState(){
    return {
      data:{},
      goodIds:''
    }
  },
  componentDidMount(){
    this.setState({data:this.props.pitModalData})
  },
  componentWillReceiveProps(props){
    if(JSON.stringify(this.props)!==JSON.stringify(props)){
      this.setState({data:props.pitModalData})
    }
    if(!this.props.pitModal&&props.pitModal){
      this.setState({goodIds:''})
    }
  },
  getValidationState(){
    var {goodIds} = this.state
    var ids = goodIds.split(',')
    if(ids.length===1&&ids[0]===''){
      return 'error';
    }
    for(var i=0;i<ids.length;i++){
      var num = parseInt(ids[i])
      if(num!==num){
        return 'error'
      }
    }
    return 'success'
  },
  submit(){
    var validState = this.getValidationState()
    var {onSuccess,onHide} = this.props
    var {data,goodIds} = this.state
    if(validState === 'error'){
      return false
    }
    var promise = $.ajax('/api/pit/html.json',{
      data:{
        ids:goodIds,
        pit:data._id
      }
    })
    promise.done(result=>{
      if(result.code===1){
        onSuccess&&onSuccess({data,html:result.msg})
        onHide&&onHide()
      }
    })
  },
  render(){
    var {pitModal,onHide} = this.props
    var {data} = this.state
    return (
      <Modal show={pitModal} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>坑位设置</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>商品id</ControlLabel>
              <FormControl
                type="text"
                placeholder="输入商品id,以逗号分割"
                value={this.state.goodIds}
                onChange={e=>{
                  this.setState({goodIds:e.target.value})
                }}
              />
              <FormControl.Feedback />
            </FormGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e=>this.submit(e)} bsStyle="primary">确定</Button>
        </Modal.Footer>
      </Modal>
    )
  }
})

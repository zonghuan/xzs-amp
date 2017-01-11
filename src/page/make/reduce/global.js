export default (state={},action)=>{
  if(action.type==='background-color'){
    state['background-color']=action.value;
    return Object.assign({},state)
  }
  return state;
}

export default (state={},action)=>{
  const globalTypes=[
    'background-color',
    'background-image'
  ];
  if(globalTypes.indexOf(action.type)>-1){
    state[action.type]=action.value;
    return Object.assign({},state)
  }
  return state;
}

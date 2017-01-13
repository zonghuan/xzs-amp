export default (state=[],action)=>{
  if(action.type==='banner'){
    state.push({
      src:action.src,
      index:action.index,
      type:action.type
    })
    return Object.assign([],state)
  }

  if(action.type==='banner-del'){
    var list=state.filter(item=>item.index!=action.index)
    return Object.assign([],list)
  }

  return state;
}

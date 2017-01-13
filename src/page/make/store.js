import {createStore,combineReducers} from 'redux'
import reduce from './reduce'
const store=createStore(combineReducers(reduce))

store.subscribe(function(){

  var content=$('#pageContent')
  var {global,banner}=store.getState()

  content.empty()

  content.css(global)

  var list=[...banner];
  list.sort((a,b)=>a.index>b.index)
  for(var i=0;i<list.length;i++){
    if(list[i].type==='banner'){
      content.append(
        `<div class="page-pannel">
          <a href="javascript:void(0);" class='page-pannel-del' data-index="${list[i].index}">x</a>
          <img style="width:10rem;height:auto;display:block;" src="${list[i].src}"/>
        <div>
        `
      )
    }
  }

})

export default store

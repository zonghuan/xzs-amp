import {createStore,combineReducers} from 'redux'
import reduce from './reduce'
const store=createStore(combineReducers(reduce))

store.subscribe(function(){
  var content=$('#pageContent')
  var {global}=store.getState()
  content.css(global)
})

export default store

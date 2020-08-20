// import { combineReducers } from 'redux'

//使用redux-immutable来管理数据，让所有的数据都变成immutable对象
import { combineReducers } from 'redux-immutable' //immutable版

// import { reducer as TodoReducer } from '../06td-reducer-split/store' //拆分版
import { reducer as TodoReducer } from '../07td-end-immutable/store' //immutable版

const reducer = combineReducers({
  todos: TodoReducer,
})

export default reducer

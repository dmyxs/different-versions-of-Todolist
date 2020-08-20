import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Reducer from './reducer'

//浏览器插件存在就使用插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(Reducer, enhancer)
export default store

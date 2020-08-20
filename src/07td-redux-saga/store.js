import { createStore, applyMiddleware, compose } from 'redux'
import SagaMiddleware from 'redux-saga'
import Reducer from './reducer'
import todoSagas from './sagas'
const saga = SagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(Reducer, composeEnhancers(applyMiddleware(saga)))
saga.run(todoSagas)

export default store

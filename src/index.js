import React from 'react'
import ReactDOM from 'react-dom'
import './main.css'
import { Provider } from 'react-redux'

//第一个版本：通过组件state进行数据传递
// import TodoList from './01td-component-state/TodoList'

//第二个版本：使用hook + 组件的版本
// import TodoList from './02td-hook/TodoList'

//第三个版本：使用redux原生API的版本
import TodoList from './03td-redux/TodoList'

//import TodoList from './04td-redux-saga/TodoList'
//import TodoList from './05td-react-redux/TodoList'
//import TodoList from './06td-reducer-split/TodoList'
// import TodoList from './07td-redux-saga/TodoList'

//非文件拆分版本的store，版本：3
import store from './03td-redux/store'

//文件拆分版本的store
// import store from './store'

const App = (
    <Provider store={store}>
        <TodoList />
    </Provider>
)

//非redux或mobx数据管理版：版本：1, 2
// ReactDOM.render(<TodoList />, document.getElementById('root'))

//react-redux版
ReactDOM.render(App, document.getElementById('root'))

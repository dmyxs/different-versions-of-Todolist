import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  INIT_LIST_ACTION,
} from './actionTypes'

import axios from 'axios'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value,
})

export const addTodoItem = () => ({
  type: ADD_TODO_ITEM,
})

export const deleteTodoItem = (index) => ({
  type: DELETE_TODO_ITEM,
  index,
})

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data,
})

//redux-thunk可以return一个函数
//使用中间件来发送请求，可以写成一个函数，函数可以接收一个dispatch
export const getJsonTodoList = () => {
  //返回函数，自动接收到dispatch方法，redux-thunk提供
  return (dispatch) => {
    axios.get('/list.json').then((res) => {
      const data = res.data.data
      const action = initListAction(data)
      dispatch(action)
    })
  }
}

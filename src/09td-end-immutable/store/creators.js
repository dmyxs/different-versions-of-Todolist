//这些方法只是抽离出来，没有调用

import { consts } from './index'
import axios from '../../06td-redux-thunk/node_modules/axios'
import { fromJS } from 'immutable'

const initListAction = (data) => ({
    type: consts.INIT_LIST_ACTION,
    data: fromJS(data), //变成immutable类型
})

export const getInputChangeAction = (value) => ({
    type: consts.CHANGE_INPUT_VALUE,
    value,
})

export const addTodoItem = (value) => ({
    type: consts.ADD_TODO_ITEM,
    data: {
        id: Math.random().toString().slice(-5),
        title: value,
        completed: false,
    },
})

export const deleteTodoItem = (index) => ({
    type: consts.DELETE_TODO_ITEM,
    index,
})

export const changeChecked = (index) => ({
    type: consts.CHANGE_CHECKED,
    index,
})

//redux-thunk可以派发一个函数，函数中可以派发action
export const getJsonTodoList = () => {
    return (dispatch) => {
        axios.get('/list.json').then((res) => {
            const data = res.data.data
            const action = initListAction(data)
            dispatch(action)
        })
    }
}

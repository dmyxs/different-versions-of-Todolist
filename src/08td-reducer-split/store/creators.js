import { consts } from './index'
import axios from '../../06td-redux-thunk/node_modules/axios'

const initListAction = (data) => ({
    type: consts.INIT_LIST_ACTION,
    data,
})

export const getInputChangeAction = (value) => ({
    type: consts.CHANGE_INPUT_VALUE,
    value,
})

export const addTodoItem = () => ({
    type: consts.ADD_TODO_ITEM,
})

export const deleteTodoItem = (index) => ({
    type: consts.DELETE_TODO_ITEM,
    index,
})

export const getJsonTodoList = () => {
    return (dispatch) => {
        axios.get('/list.json').then((res) => {
            const data = res.data.data
            const action = initListAction(data)
            dispatch(action)
        })
    }
}

import {
    CHANGE_INPUT_VALUE,
    ADD_TODO_ITEM,
    DELETE_TODO_ITEM,
    INIT_LIST_ACTION,
} from './actionTypes'

const initState = {
    inputValue: 'hello redux',
    list: [
        { id: 1, title: '吃饭', completed: false },
        { id: 2, title: '睡觉', completed: true },
        { id: 3, title: '写代码', completed: false },
    ],
}

const Reducer = (state = initState, action) => {
    if (action.type === CHANGE_INPUT_VALUE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    if (action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.push({
            id: Math.random().toString().slice(-5), //随机字符串截取后5位
            title: newState.inputValue,
            completed: false,
        })
        newState.inputValue = ''
        return newState
    }
    if (action.type === DELETE_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
    }
    if (action.type === INIT_LIST_ACTION) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list = action.data
        return newState
    }
    return state
}

export default Reducer

import { consts } from './index'
import { fromJS } from 'immutable'

//变成immutable对象
const initState = fromJS({
  inputValue: 'hello redux',
  list: [
    { id: 1, title: '吃饭', completed: false },
    { id: 2, title: '睡觉', completed: true },
    { id: 3, title: '写代码', completed: false },
  ],
})

//immutable对象的方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象
const Reducer = (state = initState, action) => {
  switch (action.type) {
    case consts.CHANGE_INPUT_VALUE:
      return state.set('inputValue', action.value) //immutable写法
    case consts.ADD_TODO_ITEM:
      let arr = state.get('list').toJS()
      let newArr = [...arr, action.data]
      let newState = state.set('list', fromJS(newArr))
      let endState = newState.set('inputValue', '')
      return endState
    case consts.DELETE_TODO_ITEM:
      let removeArr = state.get('list').toJS()
      removeArr.splice(action.index, 1)
      const newRemoveState = state.set('list', fromJS(removeArr))
      return newRemoveState
    case consts.INIT_LIST_ACTION:
      return state.set('list', action.data)
    case consts.CHANGE_CHECKED:
      console.log('777')
      return state.setIn(['list', 'action.index'], !'completed')
    default:
      return state
  }
}

export default Reducer

import React, { Component } from 'react'
import 'antd/dist/antd.css'
import store from './store'
import Input from './Input'
import ItemList from './ItemList'
import {
    getInputChangeAction,
    addTodoItem,
    deleteTodoItem,
    initListAction,
} from './actionCreators'
import axios from 'axios'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        store.subscribe(this.bindStoreChange)
    }

    //数据初始化
    componentDidMount() {
        axios.get('/list.json').then((res) => {
            const data = res.data.data
            store.dispatch(initListAction(data))
        })
    }

    //绑定数据
    bindStoreChange = () => {
        this.setState(store.getState()) //重新取数据，再替换新的数据
    }

    //派发改变请求
    passInputChangeValue = (e) => {
        //原始写法：
        // const action = {
        //   type: CHANGE_INPUT_VALUE,
        //   value: e.target.value,
        // }

        //封装到actionCreators
        const action = getInputChangeAction(e.target.value)
        store.dispatch(action)
    }

    //派发添加item请求
    passAddItem = () => {
        if (!this.state.inputValue.trim()) {
            alert('输入为空不能提交')
            return
        }
        const action = addTodoItem()
        store.dispatch(action)
    }

    //派发删除功能
    passDeleteItem = (index) => {
        const action = deleteTodoItem(index)
        store.dispatch(action)
    }

    render() {
        return (
            <div style={{ margin: '100px' }}>
                <Input
                    inputValue={this.state.inputValue}
                    toGetInputChangeValue={this.passInputChangeValue}
                    passAddItem={this.passAddItem}
                />
                <ItemList
                    list={this.state.list}
                    passDeleteItem={this.passDeleteItem}
                />
            </div>
        )
    }
}

export default TodoList

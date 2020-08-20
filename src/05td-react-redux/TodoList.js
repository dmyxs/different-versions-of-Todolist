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
import { connect } from 'react-redux'

class TodoList extends Component {
    //数据初始化
    componentDidMount() {
        axios.get('/list.json').then((res) => {
            const data = res.data.data
            store.dispatch(initListAction(data))
        })
    }

    render() {
        return (
            <div style={{ margin: '100px' }}>
                <Input
                    inputValue={this.props.inputValue} //修改成props
                    toGetInputChangeValue={this.props.passInputChangeValue}
                    passAddItem={() => this.props.passAddItem()}
                />
                <ItemList
                    list={this.props.list}
                    passDeleteItem={this.props.passDeleteItem}
                />
            </div>
        )
    }
}

//state就是store
const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //派发改变请求
        passInputChangeValue(e) {
            const action = getInputChangeAction(e.target.value)
            dispatch(action)
        },
        //派发添加item请求
        passAddItem() {
            if (!this.inputValue.trim()) {
                alert('输入为空不能提交')
                return
            }
            const action = addTodoItem()
            dispatch(action)
        },
        //派发删除功能
        passDeleteItem(index) {
            const action = deleteTodoItem(index)
            dispatch(action)
        },
    }
}

//组件可以改成UI组件，经过connect的处理，又变成了容器组件，提升了性能
export default connect(mapStateToProps, mapDispatchToProps)(TodoList) //组件与Store连接

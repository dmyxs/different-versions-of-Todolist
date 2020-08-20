import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../06td-redux-thunk/node_modules/antd/dist/antd.css'
import Input from './component/Input'
import ItemList from './component/ItemList'
import { creators } from './store'

class TodoList extends Component {
    //数据初始化
    componentDidMount() {
        this.props.getJsonTodoList()
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
        inputValue: state.todos.inputValue, //改成加todos
        list: state.todos.list,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //数据初始化
        getJsonTodoList() {
            dispatch(creators.getJsonTodoList())
        },

        //派发改变请求
        passInputChangeValue(e) {
            const action = creators.getInputChangeAction(e.target.value)
            dispatch(action)
        },
        //派发添加item请求
        passAddItem() {
            if (!this.inputValue.trim()) {
                alert('输入为空不能提交')
                return
            }
            const action = creators.addTodoItem()
            dispatch(action)
        },
        //派发删除功能
        passDeleteItem(index) {
            const action = creators.deleteTodoItem(index)
            dispatch(action)
        },
    }
}

//组件可以改成UI组件，经过connect的处理，又变成了容器组件，提升了性能
export default connect(mapStateToProps, mapDispatchToProps)(TodoList) //组件与Store连接

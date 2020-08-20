import React, { Component } from 'react'
import ListItem from './ListItem'
import Input from './Input'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: 'hello react',
            list: [
                { id: 1, title: '吃饭', completed: false },
                { id: 2, title: '睡觉', completed: true },
                { id: 3, title: '写代码', completed: false },
            ],
        }
    }
    render() {
        return (
            <div>
                <Input
                    inputValue={this.state.inputValue}
                    toGetInputValue={this.addItemToList}
                    toGetInputChangeValue={this.bindInputValue}
                />
                <ListItem
                    todoList={this.state.list}
                    toGetItemId={this.deleteItemFormList}
                    toGetCheckboxId={this.toggleCompleted}
                />
            </div>
        )
    }

    //改变value
    bindInputValue = (value) => {
        this.setState(() => ({ inputValue: value }))
    }

    // 新增一项
    addItemToList = (value) => {
        this.setState((prevState) => ({
            list: [
                ...prevState.list,
                {
                    id: Math.random().toString().slice(-5), //随机字符串截取后5位
                    title: value,
                    completed: false,
                },
            ],
            inputValue: '',
        }))
    }

    // 删除一项
    deleteItemFormList = (id) => {
        this.setState({
            // 使用 filter 返回不可变值
            list: this.state.list.filter((item) => item.id !== id),
        })
    }

    // 切换完成状态
    toggleCompleted = (id) => {
        this.setState({
            list: this.state.list.map((item) => {
                const completed =
                    item.id === id ? !item.completed : item.completed // 切换完成状态
                return {
                    ...item,
                    completed,
                }
            }),
        })
    }
}

export default TodoList

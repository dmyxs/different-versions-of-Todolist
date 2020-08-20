import React from 'react'
import { Input, Button } from 'antd'

function TodoInput(props) {
    const { toGetInputValue, inputValue, toGetInputChangeValue } = props

    //将输入的value，传递给父组件，进行添加操作
    const passInputValue = () => {
        if (!inputValue.trim()) {
            alert('请输入正确的值')
            return
        }
        toGetInputValue(inputValue)
    }

    return (
        <div>
            <Input
                type="text"
                value={inputValue}
                //监听 input 的 value 改变时，传递给父组件渲染input
                onChange={(e) => toGetInputChangeValue(e.target.value)}
            />
            <Button onClick={passInputValue}>提交</Button>
        </div>
    )
}

export default TodoInput

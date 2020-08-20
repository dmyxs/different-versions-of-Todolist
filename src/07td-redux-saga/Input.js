import React from 'react'
import { Input, Button } from 'antd'

const TodoInput = (props) => {
    return (
        <div>
            <Input
                value={props.inputValue}
                placeholder="todo info"
                style={{ width: '300px', marginRight: '8px' }}
                onChange={props.toGetInputChangeValue}
            />
            <Button type="primary" onClick={props.passAddItem}>
                提交
            </Button>
        </div>
    )
}

export default TodoInput

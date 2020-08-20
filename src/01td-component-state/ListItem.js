import React from 'react'

function InputItem(props) {
    const { toGetCheckboxId, toGetItemId, todoList } = props
    return (
        <div>
            <ul>
                {todoList.map((item) => {
                    return (
                        <li key={item.id}>
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toGetCheckboxId(item.id)}
                            />
                            <span
                                style={{
                                    textDecoration: item.completed
                                        ? 'line-through'
                                        : 'none',
                                }}
                            >
                                {item.title}
                            </span>
                            <button onClick={() => toGetItemId(item.id)}>
                                删除
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default InputItem

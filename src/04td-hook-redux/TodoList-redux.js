import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createSet, createAdd, createRemove, createToggle } from './actions'

//设置id为时间戳
let idSeq = Date.now()

function Control(props) {
    const { dispatch } = props
    const inputRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        const newText = inputRef.current.value.trim()
        if (newText.length === 0) {
            return
        }

        //原本的写法
        // dispatch({
        //   type: 'add',
        //   payload: {
        //     id: ++idSeq,
        //     text: newText,
        //     complete: false
        //   }
        // })

        //使用actions
        dispatch(
            createAdd({
                id: ++idSeq,
                text: newText,
                complete: false,
            })
        )

        inputRef.current.value = ''
    }

    return (
        <div className="control">
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    ref={inputRef}
                    className="new-todo"
                    placeholder="你需要完成什么任务"
                />
            </form>
        </div>
    )
}

function TodoItem(props) {
    const {
        todo: { id, text, complete },
        dispatch,
    } = props

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                onChange={() => dispatch(createToggle(id))}
                checked={complete}
            />
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={() => dispatch(createRemove(id))}>&#xd7;</button>
        </li>
    )
}

function Todos(props) {
    const { todos, dispatch } = props
    return (
        <ul>
            {todos.map((todo) => {
                return (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        dispatch={dispatch}
                    ></TodoItem>
                )
            })}
        </ul>
    )
}

//设置localStorage的key
const LS_KEY = '_$-todos_'

//主组件
function Todolist() {
    const [todos, setTodos] = useState([])

    const dispatch = useCallback((action) => {
        const { type, payload } = action
        switch (type) {
            case 'set':
                setTodos(payload)
                break
            case 'add':
                setTodos((todos) => [...todos, payload])
                break
            case 'remove':
                setTodos((todos) => todos.filter((todo) => todo.id !== payload))
                break
            case 'toggle':
                setTodos((todos) =>
                    todos.map((todo) => {
                        return todo.id === payload
                            ? { ...todo, complete: !todo.complete }
                            : todo
                    })
                )
                break
            default:
        }
    }, [])

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
        // dispatch({ type: 'set', payload: todos })
        dispatch(createSet(todos))
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos))
    }, [todos])

    return (
        <div className="todo-list">
            <Control dispatch={dispatch} />
            <Todos dispatch={dispatch} todos={todos} />
        </div>
    )
}

export default Todolist

import React, { useState, useCallback, useRef, useEffect, memo } from 'react'

//设置id为时间戳
let idSeq = Date.now()

//设置localStorage的key
const LS_KEY = '_$-todos_'

//主组件
function TodoList() {
    const [todos, setTodos] = useState([])

    //todo由子组件传过来
    const addTodo = useCallback((todo) => {
        setTodos((todos) => [...todos, todo])
    }, [])

    const removeTodo = useCallback((id) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id))
    }, [])

    const toggleTodo = useCallback((id) => {
        setTodos((todos) =>
            todos.map((todo) => {
                return todo.id === id
                    ? { ...todo, complete: !todo.complete }
                    : todo
            })
        )
    }, [])

    //副作用：获取localStorage，注意：设置必须放在后面
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
        setTodos(todos)
    }, [])

    //设置localStorage
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos))
    }, [todos])

    return (
        <div className="todo-list">
            <Control addTodo={addTodo} />
            <Todos
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                todos={todos}
            />
        </div>
    )
}

const Control = memo(function Control(props) {
    const { addTodo } = props
    const inputRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        const newText = inputRef.current.value.trim()
        if (newText.length === 0) {
            return
        }
        addTodo({
            id: ++idSeq,
            text: newText,
            complete: false,
        })

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
})

const Todos = memo(function Todos(props) {
    const { todos, removeTodo, toggleTodo } = props
    return (
        <ul>
            {todos.map((todo) => {
                return (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                    ></TodoItem>
                )
            })}
        </ul>
    )
})

//把每一项设置为组件，这样的好处是主组件渲染时，每一项不会渲染
const TodoItem = memo(function TodoItem(props) {
    const {
        todo: { id, text, complete },
        removeTodo,
        toggleTodo,
    } = props

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                onChange={() => toggleTodo(id)}
                checked={complete}
            />
            {/*动态类名 */}
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={() => removeTodo(id)}>&#xd7;</button>
        </li>
    )
})

export default TodoList

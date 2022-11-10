import React, {useState, KeyboardEvent, useEffect} from 'react';
import './App.css';
import TodoList from "./Components/TodoList/TodoList";
import {v1} from "uuid";
import Counter from "./Components/Counter/Counter";
import Button from "./Components/Button/Button";

export type TaskType = {
    id: string
    name: string
    done: boolean
}

export type FilterType = 'all' | 'active' | 'completed'
export type SortType = 'default' | 'reversed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([])
    const [filter, setFilter] = useState<FilterType>('all')
    const [sort, setSort] = useState<SortType>('default')
    const [inputTitle, setInputTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const storageData = localStorage.getItem('tasks_tl_v1')
        storageData && setTasks(JSON.parse(storageData))
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks_tl_v1', JSON.stringify(tasks))
        console.log(JSON.stringify(tasks))
    }, [tasks])

    // const setHandler = () => {
    //     localStorage.setItem('tasks', JSON.stringify(tasks))
    // }
    // const getHandler = () => {
    //     const localData = localStorage.getItem('tasks')
    //     localData && setTasks(JSON.parse(localData))
    // }

    let sortedTasks = [...tasks];
    sortedTasks = sort === 'default' ? sortedTasks : sortedTasks.reverse();

    let filteredTasks = filter === "active" ? sortedTasks.filter(t => !t.done) :
        filter === "completed" ? sortedTasks.filter(t => t.done) : sortedTasks;


    const inputChange = (value: string) => {
        setInputTitle(value)
        setError(false)
    }
    const addTask = () => {
        let task = inputTitle.trim();
        if (task) {
            let newTask: TaskType = {
                id: v1(),
                name: task,
                done: false
            }
            setTasks([newTask, ...tasks])
            setInputTitle('')
            error && setError(false)
        } else setError(true)
    }
    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, done: isDone} : t))
    }

    const addOnKey = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask();
    }

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                filter={filter}
                error={error}
                inputTitle={inputTitle}
                sort={sort}

                setInputTitle={inputChange}
                addTask={addTask}
                deleteTask={deleteTask}
                setFilter={setFilter}
                changeTaskStatus={changeTaskStatus}
                onKey={addOnKey}
                setSort={setSort}/>
            {/*<Button name={'set'} onClick={setHandler}/>*/}
            {/*<Button name={'get'} onClick={getHandler}/>*/}
            {/*<Counter/>*/}
        </div>
    );
}

export default App;

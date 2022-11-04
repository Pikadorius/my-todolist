import React, {useState, KeyboardEvent} from 'react';
import './App.css';
import TodoList from "./Components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    name: string
    done: boolean
}

export type FilterType = 'all' | 'active' | 'completed'


function App() {

    const [tasks, setTasks] = useState<TaskType[]>([])
    const [filter, setFilter] = useState<FilterType>('all')
    const [inputTitle, setInputTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    let filteredTasks = filter === "active" ? tasks.filter(t => !t.done) :
        filter === "completed" ? tasks.filter(t => t.done) : tasks;

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

                setInputTitle={inputChange}
                addTask={addTask}
                deleteTask={deleteTask}
                setFilter={setFilter}
                changeTaskStatus={changeTaskStatus}
                onKey={addOnKey}/>
        </div>
    );
}

export default App;

import React from 'react';
import {FilterType, TaskType} from "../../App";
import Input from "../Input/Input";
import Button from "../Button/Button";
import s from './TodoList.module.css';
import Checkbox from "../Checkbox/Checkbox";

type TodoListType = {
    tasks: TaskType[]
    filter: FilterType
    inputTitle: string
    error: boolean

    setInputTitle: (title: string) => void
    addTask: () => void
    setFilter: (filter: FilterType) => void
    deleteTask: (id: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}


const TodoList: React.FC<TodoListType> = (
    {
        tasks,
        filter,
        inputTitle,
        setInputTitle,
        addTask,
        error,
        setFilter,
        deleteTask,
        changeTaskStatus
    }) => {

    const mappedTasks = tasks.length ? tasks.map(t => {

        const changeStatus = (checked: boolean) => {
            changeTaskStatus(t.id, checked);
        }

        return (
            <ul>
                <li key={t.id}>
                    <Checkbox checked={t.done} setChecked={changeStatus}/>
                    <span className={s.task}>{t.name}</span>
                    <Button name={'x'} onClick={() => deleteTask(t.id)}/>
                </li>
            </ul>
        )
    }) : <div className={s.notasks}>Your list is empty!</div>;

    const changeFilter = (value: FilterType) => {
        return (
            () => setFilter(value)
        )
    }

    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>TodoList v.1</h3>
            <div>
                <div className={s.inputAndButton}>
                    <Input error={error} title={inputTitle} setInputTitle={setInputTitle}/>
                    <Button name={'Add task'} onClick={addTask}/>
                </div>
                {error && <div className={s.error}>Error! Write something!</div>}
                {mappedTasks}
            </div>
            <div className={s.filter}>
                <Button active={filter === "all"} name={'All'} onClick={changeFilter('all')}/>
                <Button active={filter === "active"} name={'Active'}
                        onClick={changeFilter('active')}/>
                <Button active={filter === "completed"} name={'Completed'}
                        onClick={changeFilter('completed')}/>
            </div>
        </div>
    );
};

export default TodoList;
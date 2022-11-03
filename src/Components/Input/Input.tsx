import React, {ChangeEvent} from 'react';
import s from './Input.module.css'

type InputType = {
    title: string
    setInputTitle: (title: string) => void
    error: boolean
}

const Input: React.FC<InputType> = ({title, setInputTitle, error}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const inputClass = error ? `${s.inputError} ${s.input}` : s.input;


    return (
        <div>
            <input className={inputClass} value={title} onChange={onChangeHandler}/>
        </div>
    );
};

export default Input;
import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Input.module.css'

type InputType = {
    title: string
    setInputTitle: (title: string) => void
    error: boolean
    onKey?: (e: KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputType> = ({title, setInputTitle, error, onKey}) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value)
    }
    const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        onKey && onKey(event)
    }

    const inputClass = error ? `${s.inputError} ${s.input}` : s.input;


    return (
        <div>
            <input className={inputClass} value={title} onChange={onChangeHandler} onKeyDown={onEnterHandler}/>
        </div>
    );
};

export default Input;
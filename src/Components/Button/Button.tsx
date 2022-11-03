import React from 'react';
import s from './Button.module.css'

type ButtonType = {
    name: string
    onClick: () => void
    active?: boolean
}


const Button: React.FC<ButtonType> = ({name, onClick, active}) => {

    const onClickHandler = () => onClick();

    const className = active ? `${s.button} ${s.active}` : s.button;

    return (
        <button className={className} onClick={onClickHandler}>{name}</button>
    );
};

export default Button;
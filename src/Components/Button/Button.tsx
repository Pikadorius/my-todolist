import React from 'react';
import s from './Button.module.css'

type ButtonType = {
    name: string
    onClick: ()=>void
    buttonCss: string
}


const Button: React.FC<ButtonType> = ({name,onClick, buttonCss}) => {

    const onClickHandler=()=>onClick();


    let style = {
        backgroundColor: buttonCss==="active" ? 'green' : 'white',
        color: buttonCss==="active" ? 'white' : 'black',
    }


    return (
        <button className={s.button} style={style} onClick={onClickHandler}>{name}</button>
    );
};

export default Button;
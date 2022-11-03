import React, {ChangeEvent} from 'react';

type CheckboxType = {
    checked: boolean
    setChecked: (checked: boolean)=>void
}

const Checkbox: React.FC<CheckboxType> = ({checked,setChecked}) => {
    const changeStatus = (e:ChangeEvent<HTMLInputElement>)=>{
        setChecked(e.currentTarget.checked)
    }

    return (
        <input type={"checkbox"} checked={checked} onChange={changeStatus}/>
    );
};

export default Checkbox;
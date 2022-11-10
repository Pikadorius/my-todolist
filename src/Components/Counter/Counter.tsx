import React, {useEffect, useState} from 'react';
import Button from "../Button/Button";

const Counter = () => {

    const [value, setValue] = useState(0)
    const incHandler = () => setValue(value + 1)

    useEffect(()=>{
        const storageData = localStorage.getItem('value')
        storageData && setValue(JSON.parse(storageData))
    }, [])

    useEffect(()=>{
        localStorage.setItem('value',JSON.stringify(value))
    }, [value])



   /* const setHandler = () => {
        localStorage.setItem('value', JSON.stringify(value))
    }
    const getHandler = ()=>{
        const localData=localStorage.getItem('value')
        localData && setValue(JSON.parse(localData))
    }
*/
    return (
        <div>
            {value}
            <Button name={'inc'} onClick={incHandler}/>
            {/*<Button name={'Set'} onClick={setHandler}/>*/}
            {/*<Button name={'get'} onClick={getHandler}/>*/}
        </div>
    );
};

export default Counter;
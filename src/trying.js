import React, { useState, useEffect } from "react";
const Trying = () => {

    const [value, setValue] = useState(()=>myfunc())
    const [counter, setCounter] = useState();
    const myfunc = () => {
        const a = "hariom"
        setValue(a)
    }
    useEffect(() => {
        console.log(value)
     }, [value])

    // const doSomething = () => {
    //   setCounter(123);
    // }

    // useEffect(() => {
    //    console.log('Do something after counter has changed', counter);
    // }, [counter]);
    return <></>
}
export default Trying
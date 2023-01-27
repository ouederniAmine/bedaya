// create a react functional component with the navbar from ./Nav
import React from 'react'
import Nav from './Nav'
import Form from './form'

const Calculator = () => {
    return (
        <div style={{direction: "rtl",
            "text-align": "right"}} id="landing">
       <Nav/>
         <Form/>
       
        </div>
    )
    }
export default Calculator
// create a react functional component with the navbar from ./Nav
import React from 'react'
import { useState , useEffect } from 'react'
import "./Calculator.css"
import axios from "axios";
import { chainPropTypes } from '@mui/utils';
const Form = () => {
    const [data, setData] = useState([{questionName : "" , varid: 0,  choices : [{name : ""}]}])
    const [formData, setFormData] = useState(0);
    useEffect(() => {
        axios
            .get("http://localhost:3001/api/fullquestion")
            .then((res) => {
                setData(res.data);
            })
        } , [])
    return (

<div className="flex items-center justify-center p-12">
    
  <div className=" w-full max-w-[1300px]">
  <h1 id='head'>حساب تكلفة التشطيب الإجمالية للسكن المطلوب بشكل تقريبي</h1>

    <form action="https://formbold.com/s/FORM_ID" method="POST">
        {data.map((item , i) => {
           
           if(item.var1id === null) { return( <div class="mb-5" >
        <label
          for="guest"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
       {item.questionName}
        </label>
        <select key={i} id="countries" className=" border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
          {
            item.choices.map((choice)=>{
              return(
                <option value={choice.name}>{choice.name}</option>
              )
            })
          }
</select>
      </div> )}else{
            return( <div class="mb-5" >
            <label
              for="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
           {item.questionName}
            </label>
            <input type="number" id="default-input" className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>

          </div> )
      }
        
               
            
        })}
      <div>
        <button
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          حساب تكلفة التشطيب
        </button>
      </div>
    </form>
  </div>
</div>
    )
    }
export default Form
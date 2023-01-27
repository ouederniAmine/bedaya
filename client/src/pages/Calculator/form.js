// create a react functional component with the navbar from ./Nav
import React from 'react'
import { useState , useEffect } from 'react'
import "./Calculator.css"
import axios from "axios";
const Form = () => {
    const [data, setData] = useState([{}])
    const [formData, setFormData] = useState(0);
    useEffect(() => {
        axios
            .get("http://localhost:3001/api/question")
            .then((res) => {
                setData(res.data);
            })
        } , [])
    return (

<div class="flex items-center justify-center p-12">
    
  <div class=" w-full max-w-[1300px]">
  <h1 id='head'>حساب تكلفة التشطيب الإجمالية للسكن المطلوب بشكل تقريبي</h1>

    <form action="https://formbold.com/s/FORM_ID" method="POST">
        {data.map((item) => {
          console.log(data.length )
            return (
                <div class="mb-5">
                <label
                  for="guest"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
               {item.text}
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  placeholder="5"
                  min="0"
                  class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div> 
            )
        })}

        

      <div class="-mx-3 flex flex-wrap">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="date"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="time"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>

  

      <div>
        <button
          class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
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
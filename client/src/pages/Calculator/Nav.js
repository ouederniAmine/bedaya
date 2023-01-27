import React, { useState } from 'react'
import img from '../../assets/icon.png'
import { useNavigate } from 'react-router'
const Button = (props) => {
  const navigate = useNavigate()

    return (
      <button onClick={()=>navigate("/app")} className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500'>
        {props.children}
      </button>
    )
  }
const Nav = () => {
    const navigate = useNavigate()
    let Links =[
      {name:"الرئيسية",link:"/"},
      {name:"من نحن",link:"/"},
      {name:"طلب تصميم",link:"/"},
    
    ];
    let [open,setOpen]=useState(false);
  return (
    <>
    <div className='shadow-md w-full '>
      <div className='md:flex items-center  bg-white py-4 md:px-10 px-7  space-x-4'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        <span className='text-3xl text-blue-600 mr-1 pt-2 mx-8'>
        بداية  
        </span>
        
        <img style={{width:"50px"}} src={img}/>
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <ion-icon name={open ? 'close':'menu'}></ion-icon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12  absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
            </li>
          ))
        }
        <Button >
          الاعدادات
        </Button>
      </ul>
      </div>
    </div>
    </>
  )
}

export default Nav
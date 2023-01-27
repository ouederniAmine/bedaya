import { useContext, useState } from 'react';
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();

    
    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{
        console.log(loginState, loginState.password);
        authService.login(loginState.email, loginState.password)
  .then((e) => {
    console.log("login success", e);
    navigate("/app");

  })
  .catch((error) => {
    console.log(error)
  });
    }

   
    return(<div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

       

      </form>
       <button
                
       className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mt-10"
       onClick={()=>navigate("/")}  
   >

       Back to Calculator
   </button></div>
    )   
}
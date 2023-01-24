import { useState } from 'react';
import { signupFields } from "../../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import React, { useCallback } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ReactPasswordStrength from "react-password-strength";
import app from "../../services/firebase";
import authService from '../../services/auth.service';
const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount()
  }

  //handle Signup API Integration here
  const  createAccount = async ()=>{
   authService.signup(signupState.email, signupState.password)
  .then((userCredential) => {
    // Signed in 
    console.log( userCredential.user);
    navigate("/");
  })
  .catch((error) => {
    console.log(error)
   
  });
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                  
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}

export default Signup;
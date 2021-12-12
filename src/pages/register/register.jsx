import { Link } from "react-router-dom";
import "./register.css";
import React, { useState } from "react";
import axios from "axios";


export default function Register()
{
  const [username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [error,setError]=useState(false);

  const handleSubmit=async(e)=>{
   e.preventDefault();
   setError(false);   
   try{
    const res=await axios.post("https://blog-app-v10.herokuapp.com/auth/register",{
      username,
      email,
      password,
     });
     res.data && window.location.replace("/login");
   }catch(err){
     setError(true);
   }



   
   
  };
  
  
  
  return(
        <>
        <div className="register">
         <span className="registerTitle">Register</span>
         <form className="registerForm" onSubmit={handleSubmit}>
         <label>Username</label>
           <input 
           type="text" 
           placeholder="Enter your name..."
           onChange={e=>setUsername(e.target.value)}
            />
           <label>Email</label>
           <input 
           type="email" 
           placeholder="Enter your Email"
           onChange={e=>setEmail(e.target.value)}
            />
           <label>password</label>
           <input 
           type="password" 
           placeholder="Enter your password" 
           onChange={e=>setPassword(e.target.value)}
           />
           <button className="registerButton" type="submit">Register</button>
         </form>
         <button className="loginregisterButton">
           <Link to="/login" style={{textDecoration:"none",color:"inherit"}} >Login</Link>
         </button>
         {error && <span style={{color:"red",marginTop:"10px"}}>❌ Oops Something Went wrong! ❌</span>}
        </div>
        </>
    )
};
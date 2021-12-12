import { Link } from "react-router-dom";
import "./login.css";
import React,{useRef} from 'react'
import { Context } from "../../context/Context";
import { useContext } from "react";
import axios from "axios";




export default function Login()
{
 
 
  const userRef=useRef();
  const passwordref=useRef();
  const {dispatch,isFetching}=useContext(Context);


  const handleSubmit=async(e)=>{
      e.preventDefault();
      dispatch({type:"LOGIN_START"});
      try{
        const res=await axios.post("https://blog-app-v10.herokuapp.com/api/auth/login",{
            username:userRef.current.value,
            password:passwordref.current.value,
        })
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});

          
      }catch(err){
        dispatch({type:"LOGIN_FAILURE"});
      }

  };




    return(
        <>
        <div className="login">
         <span className="loginTitle">Login</span>
         <form className="loginForm" onSubmit={handleSubmit}>
           <label>Username</label>
           <input type="text" 
           placeholder="Enter your Username..." 
           ref={userRef} />
           <label>password</label>
           <input type="password" 
           placeholder="Enter your password" 
           ref={passwordref} />
           <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
         </form>
         <button className="loginregisterButton">
             <Link to="/register" style={{textDecoration:"none",color:"inherit"}}>Register</Link>
         </button>
        </div>
        </>
    )
};
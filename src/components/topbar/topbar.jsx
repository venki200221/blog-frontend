import React from 'react';
import { Link } from 'react-router-dom';
import "./topbar.css";
import {useContext} from "react";
import { Context } from '../../context/Context';


export default function Topbar(){
    const {user,dispatch}=useContext(Context);
    // const PF="http://localhost:3000/images/";
    const handleClick=()=>{
        dispatch({type:"LOGOUT"});
    }
    
    
    
    return(
        
        <div className="top">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        {user ?(
                <Link to="settings">
                <img className="topimg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8czzbrLzXJ9R_uhKyMiwj1iGxKhJtH7pwlQ&usqp=CAU"
                alt="profile" />
                </Link>           
                ):(
                    <ul className="toplist">
                    <li  className="topListItem"><Link to="/register" >Register</Link></li>
                    <li  className="topListItem"><Link to="/login" >Login</Link></li>
                    </ul>
                )
               
                 

           } 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
           <div className="home">
           <li class="nav-item active" >
             <Link to="/" >HOME</Link> 
                </li>
           </div>
           <div className="create">
           <li>
            <Link to="/write" >CREATE</Link>
            </li>
           </div>

            <div className="logout">
            <li class="nav-item">
            <Link to="/"  onClick={handleClick}>{user && " LOGOUT"}</Link>
            </li>
            </div>
            

          </ul>
         
        </div>
      </nav>
      </div>
                
               
                 

           
            
       
    )
}
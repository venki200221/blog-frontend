import "./sidebar.css"
import {useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar(){

    const [cat,setcats]=useState([]);

    useEffect(()=>{
      const getcats=async ()=>{
          const res=await axios.get("/categories")
          setcats(res.data);
         
      };
      getcats();
    },[])

    return(
        <div className="sidebar">
           <div className= "sidebaritem">
               <span className="sidebartitle">About Me</span>
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfXFL2xWGzLVqtG5DwaYTwRinqnpmq3BMlgw&usqp=CAU" alt="about-me" />
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
           </div>

            <div className="sidebaritem">
            <span className="sidebartitle">Categories</span>
            <ul className="sidebarlist">
           
            {cat.map(c=>( 
            <Link to={`/?cat=${c.name}`}>
            <li className="sidebarlistitem" >{c.name}</li>
            </Link>
            
            
            
            ))}

            </ul>
            </div>

            <div className= "sidebaritem">
            <span className="sidebartitle">Follow Us</span>
            <div className="sidebarsocial">
            <i className="sidebaricon fab fa-facebook-square"></i>
            <i className="sidebaricon fab fa-instagram"></i>
            <i className="sidebaricon fab fa-twitter-square"></i>
            <i className="sidebaricon fab fa-linkedin"></i>


            </div>
              </div>
        </div>
    )
};

import "./set.css";
import Sidebar from "../../components/sidebar/sidebar";
import { Context } from "../../context/Context";
import {useContext} from "react";
import { useState} from "react";
import axios from "axios";

export default function Set(){

    const width=window.screen.width;
    const [file,setfile]=useState(null);
    const [Username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [sucess,setSucess]=useState(false);


    const {user,dispatch}=useContext(Context);
    // const PF="http://localhost:3000/images/";


    const handleSubmit=async(e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser={
            userId:user._id,
            Username,
            email,
            password           
        }
        if(file){
            const data=new FormData();
            const filename=Date.now()+file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilePic=filename;
            try{
              
                await axios.post("https://blog-app-v10.herokuapp.com/api/upload",data);
        
        
            }catch(err){
        
            }
        }
        try{
      const res=await axios.put("https://blog-app-v10.herokuapp.com/api/users/"+user._id,updatedUser);
        setSucess(true);
        dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    }catch(err){
        dispatch({type:"UPDATE_FAILURE"});
    }
       
        };






    return(
        <>
        <div className="settings">
             <div className="settingswrapper">
                 <div className="settingTitle">
                    <span className="settingUpdateTitle">Update Your Account</span>
                    <span className="settingDeleteTitle">Delete Account</span>
                 </div>
                 <form className="settingsForm" onSubmit={handleSubmit}>
                      <label>Profile Picture</label>
                        <div className="settingsPP">
                           <img src=/*{file ? URL.createObjectURL(file) : PF+user.profilePic}*/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8czzbrLzXJ9R_uhKyMiwj1iGxKhJtH7pwlQ&usqp=CAU"  alt=""/>
                           <label htmlFor="fileInput">
                           <i className="settingsicon far fa-user-circle"></i>
                           </label>
                           <input 
                           type="file" 
                           id="fileInput" 
                           hidden={true}
                           onChange={(e)=>setfile(e.target.files[0])}
                            ></input>
                         </div>
                           
                        <label>UserName</label>
                        <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}></input>
                        <label>Email</label>
                        <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}></input>
                        <label>password</label>
                        <input type="password" onChange={e=>setPassword(e.target.value)} ></input>
                        <button className="settingsSubmit" type="submit">Update</button>
                        {sucess && <span style={{color:"green",textAlign:"center",margin:"20px"}}>sucessfully Updated !</span>}
                        
                 </form>

             </div>
             {width >450 ?(<Sidebar />):(<div/>)}
        </div>
        </>
    )
};
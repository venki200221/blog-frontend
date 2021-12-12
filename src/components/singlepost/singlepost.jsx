import { useLocation } from "react-router";
import "./singlepost.css";
import { useEffect } from "react";
import axios from "axios"
import {useState} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {Context} from "../../context/Context"


export default function Singlepost(){
   
  const location=useLocation()
  const path= location.pathname.split("/")[2];
  const [post,setpost]=useState({});
  const PF="http://localhost:3000/images/";
  const {user}=useContext(Context); 
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [updateMode,setUpdateMode]=useState(false);


 useEffect(() => {
  const getpost=async()=>{
    const res=await  axios.get("/posts/"+path);
    console.log(res.data);
    setpost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  }
  getpost();
  
     
   
 }, [path])


const handleDelete=async()=>{
try{
  await axios.delete(`/posts/${post._id}`,
  {data:{username:user.username}});
  window.location.replace("/");
}catch(err){}
}

const handleUpdate=async()=>{
  try{
    await axios.put(`/posts/${post._id}`,
    {username:user.username,
      title,
      desc
    }
    );
    window.location.reload();
  }catch(err){}
}




    return(
      <>
        <div className="singlepost">
          <div className="singlePostWrapper">

            {post.photo && <img className="singlePostimage"
             src={PF+post.photo} 
             alt="" />
             }
             {updateMode ?<input type="text" value={title} className="singlePosttitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/>:(
             
            
            <h1 className="singlePosttitle">{post.title}
            
            {post.username === user?.username &&(
              <div className="singlePostEdit">
             <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
             <i className="singlePostIcon fas fa-trash-alt" onClick={handleDelete}></i>
             </div>)
            }
            </h1>
             )

             }






          <div className="singlePostinfo">
             <span className="singlePostAuthor">Author:
             <Link to={`/?user=${post.username}`} style={{textDecoration:"none",color:"inherit"}}>
             <b>{post.username}</b>
             </Link>
             </span>
             <br/>
             <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
         
         {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/>:(
            <p className="singlePostDesc">
            {post.desc}
            </p>
        )}
          {updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button>}
          
          </div>
        </div>
        </>
    )
};
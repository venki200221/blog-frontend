import "./write.css";
import {useState} from "react";
import axios from "axios";
import {useContext} from "react"
import { Context } from "../../context/Context";

export default function Write(){

const [title,setTitle]=useState("");
const [desc,setDesc]=useState("");
const [file,setfile]=useState(null);
const {user}=useContext(Context);



const handleSubmit=async(e)=>{
e.preventDefault();
const newPost={
    username:user.username,
    title,
    desc
}
if(file){
    const data=new FormData();
    const filename=Date.now()+file.name;
    data.append("name",filename);
    data.append("file",file);
    newPost.photo=filename;
    try{
      
        await axios.post("https://blog-app-v10.herokuapp.com/upload",data);


    }catch(err){

    }
}
try{
const res=await axios.post("https://blog-app-v10.herokuapp.com/posts,newPost");
window.location.replace("https://blog-app-v10.herokuapp.com/post/"+res.data._id);
}catch(err){}
axios.post("https://blog-app-v10.herokuapp.com/posts",newPost);
};




    return(
        <div className="write">
        {file &&
            <img className="writeImg"
         src={URL.createObjectURL(file)} 
         alt="post img"/>
        }
        
          <form className="writeform" onSubmit={handleSubmit}>
             <div className="writeFormGroup">
                <label htmlFor="fileinput">
                <i class="writeIcon fas fa-plus"></i>
                </label> 
                <input type="file"
                 id="fileinput" 
                 style={{display:"none"}}
                 onChange={(e)=>setfile(e.target.files[0])}
                 ></input> 
              
  
                <input type="text"
                 placeholder="Title" 
                 className="writeInput" 
                 autoFocus={true}
                 onChange={e=>setTitle(e.target.value)}
                 >
                 </input>
            </div>

            <div className="writeFormGroup">
                <textarea 
                 placeholder="Tell your Story..."
                 type="text"
                 className="writeInput writeText"
                 onChange={e=>setDesc(e.target.value)}
                ></textarea>
            </div>
         <button className="writeSubmit" type="submit">Publish</button>
          </form>                                 

        </div>
    )



}



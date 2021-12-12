import "./posts.css";
import Post from "../post/post.jsx"

export default function posts({posts}){

return(
    <div className="posts">
        {posts.map(p=>(        
            <Post post={p} />
        ))}
    </div>
)


}

import Topbar from "./components/topbar/topbar";
import Home from "./pages/home/home";
import Single from "./pages/single/single";
import Write from "./pages/write/write";
import Set from "./pages/set/set";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Context } from "./context/Context";
import {useContext} from "react";

function App() {
  const {user}=useContext(Context)
  return (
    <Router>
    <Topbar />
       <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/register' element={user ?<Home/>:<Register/>}/>
       <Route path='/login' element={user ?<Home/>:<Login/>}/>
       <Route path='/write' element={user ?<Write/>:<Register/>}/>   
       <Route path='/settings' element={user ?<Set/>:<Register/>}/>
       <Route path='/post/:postid' element={<Single/>}/>
       </Routes>
       

    
   
    
   
    
    </Router>
  );
}

export default App;

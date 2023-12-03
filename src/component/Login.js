import React,{useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();

//// Check if user is already logged in and remove userId if present
useEffect(() => {
  
  const userIdString = localStorage.getItem('userId');
  if (userIdString) {
    localStorage.removeItem('userId');
  }
}, []);

const handleLogin =(e)=>{
  e.preventDefault();
  const login = {
    email : email,//this is state variable and saves in another variable
    password : password
  }

 axios.post("http://localhost:5000/login",login)
 .then(response=>{

  console.log(response.data);
  const token =response.data.token;
  const userId= response.data.user;


 if(response.data.token){
  localStorage.setItem("token",JSON.stringify(token));
  localStorage.setItem("userId",JSON.stringify(userId));
}
 

  toast.success("Login successful!");
  navigate("/Home")

 }).catch(error=>{
  //handle login error
  console.log(error)
  toast.error("Login failed. Please check your credentials.");
 })

                                                              

}

  return (
    <div>
       <div class="container mt-5 text-center">
    <h2 className="mb-4">Login Form</h2>
    </div>
      <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card">
       
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label for="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
            </div>
            <button onClick={handleLogin} type="submit" className="btn btn-primary">Login</button>
            <Link to="/">Go to register</Link>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
      
    </div>
  )
}

export default Login

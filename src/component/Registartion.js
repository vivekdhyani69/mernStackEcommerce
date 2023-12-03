import React, { useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Registartion = () => {
    const [name ,setName] =useState('');
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');

    const handleSubmit =async (e)=>{
        
       
          e.preventDefault();
        
        };

const dataSubmit =async ()=>{
  try {
    const response = await axios.post('http://localhost:5000/post', { name, email, password });
    console.log('Server Response:', response.data);

    const toastMessage = response.data.success
      ? response.data.success
      : response.data.error;

    response.data.success
      ? toast.success(toastMessage)
      : toast.error(toastMessage);

  } catch (error) {
    // Toast an error message from the response, if available
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error('An error occurred.');
    }
    
  }
}    



  return (
    
  <div className="container mt-5">
    <div class="container mt-5 text-center">
    <h2 className="mb-4">Registration Form</h2>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="username" className="form-label">Username</label>
        <input type="text" 
        className="form-control"
       value = {name}
       onChange={(e)=>setName(e.target.value)}
         name="username" 
        placeholder="Enter your username" />
      </div>
      <div className="mb-3">
        <label for="email" className="form-label">Email</label>
        <input type="email" className="form-control"  name="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">Password</label>
        <input type="password" className="form-control"  name="password" placeholder="Enter your password" value={password}   onChange={(e)=>setPassword(e.target.value)}/>
      </div>
   
      <button onClick={dataSubmit} type="submit" className="btn btn-primary">Register</button>
      <Link to="/login">Login</Link>
    </form>
  </div>


  



  )
}

export default Registartion

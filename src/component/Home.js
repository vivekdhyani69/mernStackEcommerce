import axios from 'axios'
import React from 'react'
import {useEffect,useState} from "react";

const Home = () => {
  const userIds = localStorage.getItem('userId');
  const parsedData = JSON.parse(userIds);
  console.log(parsedData);
  const [data,setData] = useState(null);
  
  const getProductList=async ()=>{
    
    const data =await axios.get(`http://localhost:5000/home/${parsedData}`,{
         headers :{
      Authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`

    }
    });
   
const userData = data?.data?.userDetails;
console.log(userData, "addd")
    setData(userData);
  }

  useEffect(() =>{

    getProductList()

  },[])



  return (
    <>
    <h1>Home</h1>
    
 
    {data ? (
        <ul>
         
          <li>User Name: {data.userName}</li>
          <li>Email: {data.email}</li>
          {/* Add more properties as needed */}
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}

    </>
  )
  }
export default Home

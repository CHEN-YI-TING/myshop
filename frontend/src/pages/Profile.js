import React, { useEffect, useState } from "react";


function Profile() {
  const [userObj,setUserObj] =useState([]);
 
  useEffect(()=> {
    fetch('http://localhost:5000/auth/checkUser',{     
    headers: { "Content-Type": "application/json" },
    credentials: 'include', })
    .then((res)=>res.json())
    .then((data)=>{
      setUserObj(data);
      console.log(data);
    }).catch((err)=>{
        console.log(err);
    });

  },[])
  return <div>{userObj.username}</div>;
}

export default Profile;

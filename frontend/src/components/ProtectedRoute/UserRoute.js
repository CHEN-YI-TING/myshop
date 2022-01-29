import React from 'react';
import { Navigate } from 'react-router-dom';

 function   UserRoute({children,isAuth,setIsAuth}) {
  fetch('http://localhost:5000/auth/checkUser',{     
    headers: { "Content-Type": "application/json" },
    credentials: 'include', }).then(async(userData)=>{
        let user =  await userData.json();
        if(user !== null){
          setIsAuth(true);    
        }else{  
          setIsAuth(false)
        }
    }).catch((err)=>{
        console.log(err);
    });

  return  isAuth ? (children) : (<Navigate to={"/auth/login"}/>)
}

export default UserRoute;

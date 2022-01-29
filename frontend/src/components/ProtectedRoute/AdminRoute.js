import React from 'react';
import { Navigate } from 'react-router-dom';

 function AdminRoute({children,adminAuth,setAdminAuth}) {
  fetch('http://localhost:5000/auth/checkAdmin',{     
    headers: { "Content-Type": "application/json" },
    credentials: 'include', }).then(async(adminData)=>{
        let admin =  await adminData.json();
        if(admin !== null){
            setAdminAuth(true);    
        }else{  
            setAdminAuth(false)
        }
    }).catch((err)=>{
        console.error("錯誤",err);
    });

  return  adminAuth ? (children) : (<Navigate to={"/auth/login"}/>)
}

export default AdminRoute;
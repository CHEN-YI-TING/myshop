/* import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();



  const adminAuth = async () => {
    fetch('http://localhost:5000/auth/checkAdmin',{
      headers: { "Content-Type": "application/json" },
    }).then((res)=> res.json())
    .then((data)=>{
        console.log(data);
      if(data.user){
          setIsAuth(true);
      }else{
          navigate("/auth/login");
      }
    });

};

  return (
    <UserAuthContext.Provider value={{ isAuth,userAuth,adminAuth }}>
      {props.children}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(UserAuthContext);
  }; */





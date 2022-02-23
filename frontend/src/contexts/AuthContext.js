import React, { createContext, useState, useContext, useEffect } from "react";
//create an context object
export const AuthContext = createContext(null);

//create the provider and its functionality --> provider
export function AuthProvider(props) {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/auth/checkUser", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          (data.id && data.isAdmin === false) ||
          (data.id && data.isAdmin == null)
        ) {
          setUser(true);
        } else if (data.id && data.isAdmin) {
          setAdmin(true);
        } else {
          console.log(data);
        }
      })
      .catch((err) => console.error(err));
  }, [user, admin]);

  return (
    <AuthContext.Provider value={{ user, admin, setUser, setAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

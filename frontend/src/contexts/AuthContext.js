import React, { createContext, useState, useContext } from "react";

//create an context object
export const AuthContext = createContext(null);

//create the provider and its functionality --> provider
export function AuthProvider(props) {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);

  return (
    <AuthContext.Provider value={{ user, admin, setUser, setAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

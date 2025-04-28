"use client"
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

export interface JwtPayload extends User {
  exp: number; 
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        console.log(decoded);
        if (isExpired) {
          logout();
        } else {
          const { id, firstName, lastName, email, contactNumber } = decoded;
          setUser({ id, firstName, lastName, email, contactNumber });
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
  },[]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = React.useContext(UserContext);
  console.log("context, ",context);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};



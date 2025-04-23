"use client";  

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import styles from "../styles/login.module.css"; 
import { showNotification } from "@mantine/notifications";
import { useUser } from "../context/UserContext";

const Login = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        router.push(`/searchrides`);
      } else {
        showNotification({
          id: "login",
          title: "Error",
          message: response.data.message,
          color: "red",
          autoClose: 5000,
        });
      }
    } catch (error) {
        const errorDetails = error as AxiosError;
        const backendMessage = errorDetails.response?.data as { message?: string };
      
      showNotification({
        id: "login",
        title: "Error",
        message: backendMessage.message,
        color: "red",
        autoClose: 5000,
      });
      console.error("error in login", error);
    }
  };

  const register = () => {
    router.push("/register");
  }

  return (
    <div className={styles.login_container}>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <h4>Welcome to Aggie Ride Share!</h4>
        <div className={styles.input_group}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your email"
          />
        </div>
        
        <div className={styles.input_group}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className={styles.submit_button}>
          Login
        </button>
        <p> New member? <a style= {{color: "blue"}} onClick={register}>Register </a> </p>
      </form>
    </div>
  );
};

export default Login;

"use client";  

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "../styles/login.module.css"; 

const Login = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.status === 200) {
        const userid = response.data.user.id; 
        localStorage.setItem("userid", userid);
        router.push(`/listrides`);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.login_container}>
      <form onSubmit={handleSubmit} className={styles.login_form}>
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
      </form>
    </div>
  );
};

export default Login;

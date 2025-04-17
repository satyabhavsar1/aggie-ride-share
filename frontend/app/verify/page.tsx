"use client";  

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "../styles/login.module.css"; 
import { showNotification } from "@mantine/notifications";

const Verify = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/verify", { email, code });
      if (response.status === 200) {
        router.push(`/login`);
      } else {
        showNotification({
          id: "verify",
          title: "Error",
          message: "Invalid Verification Code or Email",
          color: "red",
          autoClose: 5000,
        });
      }
    } catch (error) {
      showNotification({
        id: "verify",
        title: "Error",
        message: "Invalid Verification Code or Email",
        color: "red",
        autoClose: 5000,
    });
    console.error("Error in verify: ",error);
    }
  };


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
          <label htmlFor="code" className={styles.label}>Verification Code:</label>
          <input
            id="code"
            type="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your verification code"
          />
        </div>

        <button type="submit" className={styles.submit_button} onClick={handleSubmit}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verify;

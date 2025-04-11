"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "../styles/register.module.css"

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.status == 201) {
        alert("Registration successful!");
        router.push("/login"); 
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
<div className={styles.register_container}>
    <form onSubmit={handleSubmit} className={styles.register_form}>
    <div className={styles.input_group}>
      <label htmlFor="firstName" className={styles.label}>First Name:</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.input_group}>
        <label htmlFor="lastName" className={styles.label}>Last Name:</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.input_group}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.input_group}>
        <label htmlFor="password" className={styles.label}>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.input_group}>
        <label htmlFor="contactNumber" className={styles.label}>Contact Number:</label>
        <input
          type="contactNumber"
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <button
        type="submit"
        className={styles.submit_button}
      >
        Register
      </button>
    </form>
    </div>
  );
}

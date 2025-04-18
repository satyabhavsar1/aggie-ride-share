"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import styles from "../styles/register.module.css"
import { showNotification } from "@mantine/notifications";

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
        showNotification({
          id: "registration",
          title: "Success",
          message: 'Registration Successful. Please verify your email.',
          color: "green",
          autoClose: 5000,
        });
        router.push("/verify"); 
      } else {
        
        showNotification({
          id: "registration",
          title: "Error",
          message: 'Registration Failed',
          color: "red",
          autoClose: 5000,
        });
      }
    } catch (error ) {
        const errorDetails = error as AxiosError;
        const backendMessage = errorDetails.response?.data as { message?: string };
        showNotification({
          id: "registration",
          title: "Error",
          message: backendMessage.message || "Something went wrong",
          color: "red",
          autoClose: 5000,
        });

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

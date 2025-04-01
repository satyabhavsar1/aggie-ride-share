"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      
      if (response.status == 200) {
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
<div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        Register
      </button>
    </form>
  </div>
</div>
  );
}

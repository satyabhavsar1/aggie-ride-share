"use client"
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/";

export default function Home() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    console.log(API_BASE_URL);
    axios.get(`${API_BASE_URL}api/message`)
      .then(response => setMessage(response.data.message))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/test-db`)
      .then(response => setData(response.data))
      .catch(error => console.error("API Test DB error:", error));
  }, []);
  
  return (
    <div>
      <h1>React + Express + TypeScript</h1>
      <p>Message from backend is: {message}</p>
      <p> {data}</p>
    </div>
  );
}

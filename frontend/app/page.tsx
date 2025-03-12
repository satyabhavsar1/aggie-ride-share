"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateRide from "./components/CreateRide";

export default function Home() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/"; 

  useEffect(() => {
    console.log('API_BASE_URL', API_BASE_URL); 
    axios.get(`${API_BASE_URL}/api/message`) 
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, [API_BASE_URL]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/test-db`) 
      .then(response => setData(response.data))
      .catch(error => console.error("API Test DB error:", error));
  }, [API_BASE_URL]);

  return (
    <div>
      <h1>React + Express + TypeScript</h1>
      <p>Message from backend is: {message || "Loading..."}</p>
      <p>Test DB response: {JSON.stringify(data) || "No data received"}</p>
      <CreateRide/>
    </div>
  );
}

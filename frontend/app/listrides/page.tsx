"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../styles/global.module.css"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

interface Ride {
    id: number;
    city_from: string;
    city_to: string;
    date: string;
    time: string;
    num_seats: number;
    cost: number;
    contact_number: string;
  }
  
function ListRides () {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const userid = localStorage.get("userid"); 
        const response = await axios.get(`${API_BASE_URL}/api/rides?userid=${userid}`);
        setRides(response.data);
      } catch (err) {
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  const handleCreate= () =>{
    router.push('/createride');
    return;
  }
  if (loading) return <p className="text-center text-gray-600">Loading rides...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Available Rides</h2>
        {rides.length === 0 ? (
          <p className="text-center text-gray-500">No rides available</p>
        ) : (
          <ul className="space-y-4">
            {rides.map((ride: Ride) => (
              <li key={ride.id} className="border p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-lg">{ride.city_from} → {ride.city_to}</p>
                <p className="text-gray-700">Date: {ride.date} | Time: {ride.time}</p>
                <p className="text-gray-700">Seats Available: {ride.num_seats}</p>
                <p className="text-gray-700">Cost: ${ride.cost} per seat</p>
                <p className="text-gray-700">Contact: {ride.contact_number}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" onClick={handleCreate} className={styles.submit_button}>
          Create Ride
    </button>
    </div>
  );
}

export default ListRides;

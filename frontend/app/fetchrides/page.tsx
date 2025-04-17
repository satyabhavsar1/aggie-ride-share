"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../styles/fetchrides.module.css"
import { Ride } from "../components/types";
import { Sidebar } from "../components/SideNavBar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

function FetchRides () {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("No user found in localStorage");
          return;
        }
        const user = JSON.parse(storedUser);
        const userid = user.id;
        const response = await axios.get(`${API_BASE_URL}/api/rides/${userid}`);
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
    <div className={styles.background}>
      <Sidebar />

        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Your Rides</h2>
        {rides.length === 0 ? (
          <p className="text-center text-gray-500">You have not created any rides</p>
        ) : (
          <div className={styles.ride_card}>
            {rides.map((ride: Ride) => (
              <div key={ride.id} className={styles.ride_item}>
                <p className="font-semibold text-lg">{ride.city_from.name} → {ride.city_to.name}</p>
                <p className="text-gray-700">Date: {ride.date} | Time: {ride.time}</p>
                <p className="text-gray-700">Seats Available: {ride.num_seats}</p>
                <p className="text-gray-700">Cost: ${ride.cost} per seat</p>
                <p className="text-gray-700">Contact: {ride.contact_number}</p>
              </div>
            ))}
          </div>
        )}
      <button type="submit" onClick={handleCreate} className={styles.fab}>
          Create Ride
      </button>
    </div>
  );
}

export default FetchRides;

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/fetchrides.module.css"
import { Ride } from "../components/types";
import { Sidebar } from "../components/SideNavBar";
import { useUser } from "../context/UserContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

function FetchRides () {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        if (!user) {
          console.error("localStorage");
          return;
        }
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
  }, [user]);

  if (loading) return <p className="text-center text-gray-600">Loading rides...</p>;

  return (
    <div className={styles.background}>
      {user? (
      <>
      <Sidebar />

        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Your Rides</h2>
        {rides.length === 0 ? (
          <p className="text-center text-gray-500">You have not created any rides</p>
        ) : (
          <div className={styles.ride_card}>
            {rides.map((ride: Ride) => (
              <div key={ride.id} className={styles.ride_item}>
                <p className="font-semibold text-lg">{ride.city_from.name} → {ride.city_to.name}</p>
                <p className="text-gray-700"> Pickup and Drop: {ride.pickup} → {ride.drop}</p>
                <p className="text-gray-700">Date: {ride.date} | Time: {ride.time}</p>
                <p className="text-gray-700">Seats Available: {ride.num_seats}</p>
                <p className="text-gray-700">Cost: ${ride.cost} per seat</p>
                <p className="text-gray-700">Contact: {ride.contactNumber}</p>
              </div>
            ))}
          </div>
        )}
        </>):(
        <p>Not logged in</p>
      )}
    </div>
  );
}

export default FetchRides;

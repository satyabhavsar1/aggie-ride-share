"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/SideNavBar";
import styles from '../styles/global.module.css'
import { RequestedRide } from "../components/types";
import { showNotification } from "@mantine/notifications";
import { useUser } from "../context/UserContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

export default function RequestedRides() {
      const [requestedRides, setRequestedRides] = useState([]);
      const { user } = useUser();
      
      useEffect(() => {
        const fetchRequestedRides = async () => {
          try {
            if (!user) {
              console.error("No user found in localStorage");
              return;
            }
            const userid = user.id;
            const response = await axios.get(`${API_BASE_URL}/api/rideRequests/requester/${userid}`);
            setRequestedRides(response.data);
          } catch (err) {
            console.error("Error fetching rides:", err);
          } 
        };
        fetchRequestedRides();
      }, [user]);

      const handleCancel = async (requestId: number) => {
        try{
          const response = await axios.delete(`${API_BASE_URL}/api/rideRequests/${requestId}`);
          if(response.status===200){
            showNotification({
                      id: "cancelRequest",
                      title: "Success",
                      message: response.data.message,
                      color: "green",
                      autoClose: 5000,
                    });
          }
        } catch (err) {
          console.error("Error cancelling ride request:", err);
        } 
      }
    
    return (
    <div className={styles.background}>
      {user? (
        <>
        <Sidebar />

        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Requested Rides</h2>
        {requestedRides.length === 0 ? (
            <p className="text-center text-gray-500">You have not requested any rides</p>
        ) : (
            <div className={styles.ride_card}>
            {requestedRides.map((ride: RequestedRide) => (
                <div key={ride.id} className={styles.ride_item}>
                <p className="font-semibold text-lg">{ride.ride.city_from.name} → {ride.ride.city_to.name}</p>
                <p className="text-gray-700"> Pickup and Drop: {ride.ride.pickup} → {ride.ride.drop}</p>
                <p className="text-gray-700">Date: {ride.ride.date} | Time: {ride.ride.time}</p>
                <p className="text-gray-700">Seats Requested: {ride.num_seats_requested}</p>
                <p className="text-gray-700">Cost: ${ride.ride.cost} per seat</p>
                <p className="text-gray-700">Contact: {ride.ride.contactNumber}</p>
                <p className="text-gray-700">Status: {ride.status}</p>
                <button className={styles.submit_button} onClick={()=> handleCancel(ride.id)}>Cancel Request</button>
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
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/fetchrides.module.css"
import { RequestedRide } from "../components/types";
import { Sidebar } from "../components/SideNavBar";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

  
function PendingRequests () {
  const [pendingRequests, setPendingRequests] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("No user found in localStorage");
          return;
        }
        const user = JSON.parse(storedUser);
        const userid = user.id;
        const response = await axios.get(`${API_BASE_URL}/api/rideRequests/${userid}`);
        const pendingRequests = response.data.filter( (ele: RequestedRide) => (ele.status==="pending" ));
        setPendingRequests(pendingRequests);
      } catch (err) {
        console.error("Error fetching rides:", err);
      } 
    };

    fetchPendingRequests();
  }, []);

  const handleAccept = async (id: number, num_seats: number) => {
    const response = await axios.put(`/api/rideRequests/${id}`, { status:'accepted', num_seats_requested: num_seats});
      if (response.status === 200) {
        showNotification({
            id: "request",
            title: "Success",
            message: 'Request Accepted',
            color: "green",
            autoClose: 5000,
          });
  
        router.push(`/pendingrequests`);
      } else {
        showNotification({
          id: "request",
          title: "Error",
          message: response.data.message,
          color: "red",
          autoClose: 5000,
        });
      }

  }

  const handleDecline = async (id: number) => {
    const response = await axios.put(`/api/rideRequests/${id}`, { status:'declined', num_seats_requested:0});
    if (response.status === 200) {
      showNotification({
          id: "request",
          title: "Success",
          message: 'Request Declined',
          color: "green",
          autoClose: 5000,
        });

      router.push(`/pendingrequests`);
    } else {
      showNotification({
        id: "request",
        title: "Error",
        message: response.data.message,
        color: "red",
        autoClose: 5000,
      });
    }
  }

  return (
    <div className={styles.background}>
      <Sidebar />

        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Pending Requests for you</h2>
        {pendingRequests.length === 0 ? (
          <p className="text-center text-gray-500">You do not have any Pending Requests</p>
        ) : (
          <div className={styles.ride_card}>
            {pendingRequests.map((ride: RequestedRide) => (
              <div key={ride.id} className={styles.ride_item}>
                <p className="font-semibold text-lg">{ride.ride.city_from.name} → {ride.ride.city_to.name}</p>
                <p className="text-gray-700">Date: {ride.ride.date} | Time: {ride.ride.time}</p>
                <p className="text-gray-700">Seats Requested: {ride.num_seats_requested}</p>
                <p className="text-gray-700">Cost: ${ride.ride.cost} per seat</p>
                <p className="text-gray-700">Contact: {ride.ride.contact_number}</p>
                <div>
                    <button className={styles.submit_button} onClick={ () => handleAccept(ride.id, ride.num_seats_requested)}>Accept</button>
                    <button className={styles.submit_button} onClick={ () => handleDecline(ride.id)}>Decline</button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default PendingRequests;

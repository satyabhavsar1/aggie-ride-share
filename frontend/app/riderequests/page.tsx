"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/fetchrides.module.css";
import { RequestedRide } from "../components/types";
import { Sidebar } from "../components/SideNavBar";
import { showNotification } from "@mantine/notifications";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

function RideRequests() {
  const [allRequests, setAllRequests] = useState<RequestedRide[]>([]);
  const [requests, setRequests] = useState<RequestedRide[]>([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchAllRequests = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        console.error("No user found in localStorage");
        return;
      }
      const user = JSON.parse(storedUser);
      const userid = user.id;
      const response = await axios.get(`${API_BASE_URL}/api/rideRequests/${userid}`);
      const allRequests = response.data;
      setAllRequests(allRequests);
      setRequests(allRequests);
    } catch (err) {
      console.error("Error fetching rides:", err);
    } 
  };


  useEffect(() => {
    fetchAllRequests();
  }, []);

  useEffect(() => {
    let filtered = allRequests;

    if (dateFilter) {
      filtered = filtered.filter(r => r.ride.date === dateFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    setRequests(filtered);
  }, [dateFilter, statusFilter, allRequests]);

  const handleContactClick = (contactNumber: string, from: string, to: string) => {
    const message = encodeURIComponent(`Hello, I see you are interested in the ride from ${from} to ${to}. I wanted to know some details.`);
    const smsUrl = `sms:${contactNumber}?body=${message}`;
    window.location.href = smsUrl;
  };

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
      await fetchAllRequests();
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
      await fetchAllRequests();
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

      <div className={styles.filters}>
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No ride requests match your filter.</p>
      ) : (
        <div className={styles.ride_card}>
          {requests.map((ride: RequestedRide) => (
            <div key={ride.id} className={styles.ride_item}>
              <p className="font-semibold text-lg">{ride.ride.city_from.name} → {ride.ride.city_to.name}</p>
              <p className="text-gray-700"> Pickup and Drop: {ride.ride.pickup} → {ride.ride.drop}</p>
              <p className="text-gray-700">Date: {ride.ride.date} | Time: {ride.ride.time}</p>
              <p className="text-gray-700">Seats Requested: {ride.num_seats_requested}</p>
              <p className="text-gray-700">Status: {ride.status}</p>
              <p className="text-gray-700">Cost: ${ride.ride.cost} per seat</p>
              <p className="text-gray-700">Requester: {ride.requester.firstName} {ride.requester.lastName}</p>
              <p className="text-gray-700">Requester Contact: {ride.requester.contactNumber}</p>
              <button
                  onClick={() => handleContactClick(ride.requester.contactNumber, ride.ride.city_from.name, ride.ride.city_to.name)}
                  className={styles.submit_button}
                >
                  Contact
                </button>

              {ride.status === 'pending' && (
                <div className={styles.button_container}>
                  <button className={styles.accept_button} onClick={() => handleAccept(ride.id, ride.num_seats_requested)}>Accept</button>
                  <button className={styles.decline_button} onClick={() => handleDecline(ride.id)}>Decline</button>
                </div>
              )}  
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RideRequests;

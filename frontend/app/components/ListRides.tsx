"use client";
import axios from "axios";
import {Ride} from "../components/types"
import styles from "../styles/searchrides.module.css"
import { useState } from "react";
import { showNotification } from "@mantine/notifications";

interface Props {
    rides: Ride[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

function ListRides (props: Props) {

  const [seatSelections, setSeatSelections] = useState<Record<number, number>>({});

  const handleSeatChange = (rideId: number, seatCount: number) => {
    setSeatSelections((prev) => ({ ...prev, [rideId]: seatCount }));
  };

  const handleContactClick = (contactNumber: string, from: string, to: string) => {
    const message = encodeURIComponent(`Hello, I'm interested in the ride from ${from} to ${to}. Is it still available?`);
    const smsUrl = `sms:${contactNumber}?body=${message}`;
    window.location.href = smsUrl;
  };

  const handleRequestRide = async (ride_id: number) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        return;
      }
      const user = JSON.parse(storedUser);
      const numSeats = seatSelections[ride_id] || 1;

      const data = {
        userId: user?.id,
        rideId: ride_id,
        numSeats: numSeats,
      };

      const response = await axios.post(`${API_BASE_URL}/api/rideRequests/`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        showNotification({
            id: "request",
            title: "Success",
            message: 'Ride Requested',
            color: "green",
            autoClose: 5000,
          });
      } else {
        showNotification({
          id: "request",
          title: "Error",
          message: 'Unable to Request Ride',
          color: "red",
          autoClose: 5000,
        });
      }
    } catch (error) {
      showNotification({
        id: "request",
        title: "Error",
        message: 'Unable to Request Ride',
        color: "red",
        autoClose: 5000,
      });
      console.error("Error:", error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        {!props.rides || props.rides.length === 0 ? (
          <p className="text-center text-gray-500">No rides available</p>
        ) : (
          <div className={styles.ride_card}>
            {props.rides.map((ride: Ride) => (
              <div key={ride.id} className={styles.ride_item}>
                <p className="font-semibold text-lg">{ride.city_from.name} → {ride.city_to.name}</p>
                <p className="text-gray-700">Date: {ride.date} | Time: {ride.time}</p>
                <p className="text-gray-700">Seats Available: {ride.num_seats}</p>
                <p className="text-gray-700">Cost: ${ride.cost} per seat</p>
                <p className="text-gray-700">Contact: {ride.contact_number}</p>
                <div className="mt-2">
                <label className="mr-2">Select number of seats:</label>
                <select
                  value={seatSelections[ride.id] || 1}
                  onChange={(e) => handleSeatChange(ride.id, parseInt(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {Array.from({ length: ride.num_seats }, (_, i) => i + 1).map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
              </div>

                <div>
                  
                <button
                  onClick={() => handleContactClick(ride.contact_number, ride.city_from.name, ride.city_to.name)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Contact
                </button>
                <button
                  onClick={() => handleRequestRide(ride.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Request Ride
                </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}

export default ListRides;

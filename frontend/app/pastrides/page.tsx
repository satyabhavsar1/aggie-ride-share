"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/fetchrides.module.css"
import { RequestedRide, Ride } from "../components/types";
import { Sidebar } from "../components/SideNavBar";
import { useUser } from "../context/UserContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

  
function PastRides () {
  const [pastRidesAsRider, setPastRidesAsRider] = useState([]);
  const [pastRidesAsDriver, setPastRidesAsDriver] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchPastRides = async () => {
      try {

        if (!user) {
          console.error("No user found in localStorage");
          return;
        }
        const userid = user.id;
        const response = await axios.get(`${API_BASE_URL}/api/rideRequests/${userid}`);
        const acceptedRides = response.data.filter( (ele: RequestedRide) => (ele.status==="accepted" ));
        setPastRidesAsRider(acceptedRides);
      } catch (err) {
        console.error("Error fetching rides:", err);
      } 
    };

    const fetchPastCreatedRides = async() => {
        try {
            if (!user) {
              console.error("No user found in localStorage");
              return;
            }
            const userid = user.id;
            const response = await axios.get(`${API_BASE_URL}/api/rides/${userid}`);
            const yourRides = response.data;
            setPastRidesAsDriver(yourRides);
          } catch (err) {
            console.error("Error fetching rides:", err);
          } 
    }
    fetchPastCreatedRides();
    fetchPastRides();
  }, [user]);

  return (
    <div className={styles.background}>
      {user? (
        <>
      <Sidebar />

        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Your Past Rides As Rider</h2>
        {pastRidesAsRider.length === 0 ? (
          <p className="text-center text-gray-500">You do not have any past Rides</p>
        ) : (
          <div className={styles.ride_card}>
            {pastRidesAsRider.map((ride: RequestedRide) => (
              <div key={ride.id} className={styles.ride_item}>
                <p className="font-semibold text-lg">{ride.ride.city_from.name} → {ride.ride.city_to.name}</p>
                <p className="text-gray-700"> Pickup and Drop: {ride.ride.pickup} → {ride.ride.drop}</p>
                <p className="text-gray-700">Date: {ride.ride.date} | Time: {ride.ride.time}</p>
                <p className="text-gray-700">Seats Books: {ride.num_seats_requested}</p>
                <p className="text-gray-700">Cost: ${ride.ride.cost} per seat</p>
                <p className="text-gray-700">Contact: {ride.ride.contactNumber}</p>
              </div>
            ))}
          </div>
        )}
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Your Past Rides As Driver</h2>
        {pastRidesAsDriver.length === 0 ? (
          <p className="text-center text-gray-500">You do not have any past Rides</p>
        ) : (
          <div className={styles.ride_card}>
            {pastRidesAsDriver.map((ride: Ride) => (
              <div key={ride.id} className={styles.ride_item}>
                <p className="font-semibold text-lg">{ride.city_from.name} → {ride.city_to.name}</p>
                <p className="text-gray-700">Date: {ride.date} | Time: {ride.time}</p>
                <p className="text-gray-700">Seats Remaining: {ride.num_seats}</p>
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

export default PastRides;

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/fetchrides.module.css"
import { RequestedRide, Ride } from "../components/types";
import { Sidebar } from "../components/SideNavBar";
import { useUser } from "../context/UserContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

  
function UpcomingRides () {
  const [upcomingRidesAsRider, setUpcomingRidesAsRider] = useState([]);
  const [upcomingRidesAsDriver, setUpcomingRidesAsDriver] = useState([]);
  const { user } = useUser();
  
  useEffect(() => {
    const fetchUpcomingRides = async () => {
      try {
        if (!user) {
          console.error("No user found in localStorage");
          return;
        }
        const userid = user.id;
        const response = await axios.get(`${API_BASE_URL}/api/rideRequests/requester/${userid}`);
        const acceptedRides = response.data
          .filter((ele: RequestedRide) => ele.status === "accepted")
          .filter((ele: RequestedRide) => new Date(ele.ride.date) > new Date());
        setUpcomingRidesAsRider(acceptedRides);
      } catch (err) {
        console.error("Error fetching rides:", err);
      } 
    };

    const fetchUpcomingCreatedRides = async() => {
        try {
            if (!user) {
              console.error("No user found in localStorage");
              return;
            }
            const userid = user.id;
            const response = await axios.get(`${API_BASE_URL}/api/rides/${userid}`)
            const yourRides = response.data
            .filter((ele: Ride) => new Date(ele.date) > new Date());
            setUpcomingRidesAsDriver(yourRides);
          } catch (err) {
            console.error("Error fetching rides:", err);
          } 
    }
    fetchUpcomingRides();
    fetchUpcomingCreatedRides();
  }, [user]);

  return (
    <div className={styles.background}>
      {user ? (
      <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.section}>
          <h2 className={styles.heading}>Your Upcoming Rides As Rider</h2>
          {upcomingRidesAsRider.length === 0 ? (
            <p className={styles.noRides}>You do not have any upcoming Rides</p>
          ) : (
            <div className={styles.ride_card}>
              {upcomingRidesAsRider.map((ride: RequestedRide) => (
                <div key={ride.id} className={styles.ride_item}>
                  <p className={styles.route}>{ride.ride.city_from.name} → {ride.ride.city_to.name}</p>
                  <p> Pickup and Drop: {ride.ride.pickup} → {ride.ride.drop}</p>
                  <p> Date: {ride.ride.date} | Time: {ride.ride.time}</p>
                  <p> Seats Booked: {ride.num_seats_requested}</p>
                  <p> Cost: ${ride.ride.cost} per seat</p>
                  <p> Contact: {ride.ride.contactNumber}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Your Upcoming Rides As Driver</h2>
          {upcomingRidesAsDriver.length === 0 ? (
            <p className={styles.noRides}>You do not have any upcoming Rides</p>
          ) : (
            <div className={styles.ride_card}>
              {upcomingRidesAsDriver.map((ride: Ride) => (
                <div key={ride.id} className={styles.ride_item}>
                  <p className={styles.route}>{ride.city_from.name} → {ride.city_to.name}</p>
                  <p>Pickup and Drop: {ride.pickup} → {ride.drop}</p>
                  <p>Date: {ride.date} | Time: {ride.time}</p>
                  <p>Seats Remaining: {ride.num_seats}</p>
                  <p>Cost: ${ride.cost} per seat</p>
                  <p>Contact: {ride.contactNumber}</p>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
    </>):(
        <p>Not logged in</p>
      )}
  </div>

  );
}

export default UpcomingRides;

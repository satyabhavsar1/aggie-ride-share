"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/searchrides.module.css";
import ListRides from "../components/ListRides";
import { Ride, City } from "../components/types";
import { Sidebar } from "../components/SideNavBar";


export default function SearchRides() {
  const [cities, setCities] = useState<City[]>([]);
  const [fromCity, setFromCity] = useState<string | null>(null);
  const [toCity, setToCity] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched]= useState(false);


  useEffect(() => {
    axios.get("/api/cities").then((res) => setCities(res.data));
  }, []);

  const handleSearch = async () => {
    if (!fromCity || !toCity || !date) {
      alert("Please select all fields");
      return;
    }
    const formattedDate = date.toISOString().split("T")[0];
    setLoading(true);

    try {
      const res = await axios.get(`/api/rides/search?fromCity=${fromCity}&toCity=${toCity}&date=${formattedDate}`);
      setRides(res.data);
      console.log(res.data);
      setSearched(true);
  
    } catch (error) {
      console.error("Error fetching rides:", error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.background}>
      <Sidebar />

      <h2 className={styles.title}>Search Rides</h2>

      <div className={styles.grid}>
        <div>
          <label className={styles.label}>From City</label>
          <select
            className={styles.select}
            value={fromCity || ""}
            onChange={(e) => setFromCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id.toString()}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.label}>To City</label>
          <select
            className={styles.select}
            value={toCity || ""}
            onChange={(e) => setToCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id.toString()}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      <div className="mt-4">
        <label className={styles.label}>Date</label>
        <input
          type="date"
          value={date?.toISOString().split("T")[0] || ""}
          onChange={(e) => setDate(new Date(e.target.value))}
          className={styles.date_input}
        />
      </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className={styles.submit_button}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {searched && (
        <>
          <h3 className={styles.available_rides_title}>Available Rides</h3>
          {rides.length === 0 ? (
            <p className={styles.noRides}>No rides found.</p>
          ) : <ListRides
              rides= {rides}/>
          }
        </>
      )}
    </div>
  );
}

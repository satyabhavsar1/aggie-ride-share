"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../styles/createride.module.css"
import { useUser } from "../context/UserContext";
import { Sidebar } from "../components/SideNavBar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

export default function CreateRide() {
  const router = useRouter();

  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const { user } = useUser();


  const [formData, setFormData] = useState({
    date: getTodayDate(),
    time: "14:30:00",
    pickups: ["Location A"],
    drops: ["Location B"],
    cost: 20,
    drop_date: getTodayDate(),
    drop_time: "16:00:00",
    num_seats: 4,
    city_from: "",
    city_to: "",
    contact_number: user ? user.contactNumber : "",
    whatsapp_number: 1234567890,
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cities`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        alert("User not logged in!");
        return;
      }
  
      const updatedFormData = {
        ...formData,
        user_id: userId, 
      };
      await axios.post(`${API_BASE_URL}/api/rides`, updatedFormData);
      alert("Ride added successfully!");
      router.push("/fetchrides");
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  return (
    <div className={styles.background}>
      <Sidebar />

      <form onSubmit={handleSubmit} className={styles.ride_form}>
      <h4>Create Ride</h4>

      <div className={styles.input_group}>
      <label htmlFor="From" className={styles.label}>From:</label>
      <select
              value={formData.city_from}
              onChange={(e) => handleChange(e, "city_from")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.input_group}>
          <label htmlFor="To" className={styles.label}>To:</label>
            <select
              value={formData.city_to}
              onChange={(e) => handleChange(e, "city_to")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.input_group}>
          <label htmlFor="Date" className={styles.label}>Date:</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange(e, "date")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
          <div className={styles.input_group}>
          <label htmlFor="Time" className={styles.label}>Time:</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange(e, "time")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className={styles.input_group}>
          <label htmlFor="Cost" className={styles.label}>Cost:</label>
            <input
              type="number"
              placeholder="Enter cost per seat"
              value={formData.cost}
              onChange={(e) => handleChange(e, "cost")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className={styles.input_group}>
          <label htmlFor="Seats" className={styles.label}>Seats Available:</label>
              <input
                type="number"
                placeholder="Enter number of seats"
                value={formData.num_seats}
                onChange={(e) => handleChange(e, "num_seats")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className={styles.input_group}>
          <label htmlFor="Contact" className={styles.label}>Contact Number:</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={formData.contact_number}
                onChange={(e) => handleChange(e, "contact_number")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submit_button}
          >
            Create
          </button>
        </form>
      </div>
  );
}

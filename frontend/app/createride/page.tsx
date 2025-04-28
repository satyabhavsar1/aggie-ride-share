"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../styles/createride.module.css"
import { useUser } from "../context/UserContext";
import { Sidebar } from "../components/SideNavBar";
import { showNotification } from "@mantine/notifications";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/";

export default function CreateRide() {
  const router = useRouter();

  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [showNewCityFromInput, setShowNewCityFromInput] = useState(false);
  const [showNewCityToInput, setShowNewCityToInput] = useState(false);
  const [pickupSpots, setPickupSpots] = useState<{ id: number; name: string }[]>([]);
  const [dropSpots, setDropSpots] = useState<{ id: number; name: string }[]>([]);
  const [showCustomPickupInput, setShowCustomPickupInput] = useState(false);
  const [showCustomDropInput, setShowCustomDropInput] = useState(false);
  
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const { user } = useUser();


  const [formData, setFormData] = useState({
    date: getTodayDate(),
    time: "14:30:00",
    pickup: "Location A",
    drop: "Location B",
    cost: 20,
    drop_date: getTodayDate(),
    drop_time: "16:00:00",
    num_seats: 4,
    city_from: "",
    city_to: "",
    newCityFrom: "",
    newCityTo: "",  
    contactNumber: user ? user.contactNumber : "",
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
  }, [user]);

  useEffect(() => {
    const fetchPickupSpots = async () => {
      if (!formData.city_from || formData.city_from === "new") return;
      try {
        const res = await axios.get(`${API_BASE_URL}/api/spots/${formData.city_from}`);
        setPickupSpots(res.data);
      } catch (err) {
        console.error("Error fetching pickup spots:", err);
      }
    };
    fetchPickupSpots();
  }, [formData.city_from, user]);
  
  useEffect(() => {
    const fetchDropSpots = async () => {

      if (!formData.city_to || formData.city_to === "new") return;
      try {
        const res = await axios.get(`${API_BASE_URL}/api/spots/${formData.city_to}`);
        setDropSpots(res.data);
      } catch (err) {
        console.error("Error fetching drop spots:", err);
      }
    };
    fetchDropSpots();
  }, [formData.city_to, user]);
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: keyof typeof formData
  ) => {
    const value = e.target.value;
  
    if (field === "pickup") {
      if (value === "other") {
        setShowCustomPickupInput(true);
      } else {
        setShowCustomPickupInput(false);
        setFormData({ ...formData, pickup: value});
      }
      return;
    }
  
    if (field === "drop") {
      if (value === "other") {
        setShowCustomDropInput(true);
      } else {
        setShowCustomDropInput(false);
        setFormData({ ...formData, drop: value });
      }
      return;
    }
  
    if (field === "city_from") {
      if (value === "new") {
        setShowNewCityFromInput(true);
        setFormData({
          ...formData,
          city_from: "",
          pickup: "",
        });
      } else {
        setShowNewCityFromInput(false);
        setFormData({
          ...formData,
          city_from: value,
          pickup: "",
        });
      }
      setShowCustomPickupInput(false); 
      return;
    }
  
    if (field === "city_to") {
      if (value === "new") {
        setShowNewCityToInput(true);
        setFormData({
          ...formData,
          city_to: "",
          drop: "", 
        });
      } else {
        setShowNewCityToInput(false);
        setFormData({
          ...formData,
          city_to: value,
          drop: "", 
        });
      }
      setShowCustomDropInput(false); 
      return;
    }
   
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
      
  const createCity = async (name: string) => {
    const res = await axios.post(`${API_BASE_URL}/api/cities`, { name });
    return res.data.id; 
  };

  const createSpot = async (name: string, city_id: string) => {
    const res = await axios.post(`${API_BASE_URL}/api/spots/${city_id}`, { name });
    return res.data.id; 
  };
  

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let cityFromId = formData.city_from;
      let cityToId = formData.city_to;
  
      if (showNewCityFromInput && formData.newCityFrom) {
        cityFromId = await createCity(formData.newCityFrom);
      }
  
      if (showNewCityToInput && formData.newCityTo) {
        cityToId = await createCity(formData.newCityTo);
      }

      if(showCustomPickupInput && formData.pickup) {
        await createSpot( formData.pickup, cityFromId);
      }

      if(showCustomDropInput && formData.drop) {
        await createSpot( formData.drop, cityToId);
      }

      if (!user) {
        console.error("No user found in localStorage");
        return;
      }
  
      const updatedFormData = {
        ...formData,
        city_from: cityFromId,
        city_to: cityToId,
        user_id: user.id,
        user: { id: user.id }
      };
  
      await axios.post(`${API_BASE_URL}/api/rides`, updatedFormData);
      showNotification({
        id: "request",
        title: "Success",
        message: 'Ride Created Successfully',
        color: "green",
        autoClose: 5000,
      });
  
      router.push("/fetchrides");
    } catch (error) {
      showNotification({
        id: "request",
        title: "Error",
        message: 'Error Creating Ride',
        color: "red",
        autoClose: 5000,
      });
      console.error("Error creating ride:", error);
    }
  };
  
  return (
    
    <div className={styles.background}>
      {user? (
        <>
      <Sidebar />

      <form onSubmit={handleSubmit} className={styles.ride_form}>
      <h4>Create Ride</h4>

      <div className={styles.input_group}>
      <label htmlFor="From" className={styles.label}>From:</label>
      <select
              value={formData.city_from}
              onChange={(e) => handleChange(e, "city_from")}
              
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
              <option value="new">Other (Add New City)</option>
            </select>
            {showNewCityFromInput && (
              <input
                type="text"
                placeholder="Enter new city name"
                value={formData.newCityFrom}
                onChange={(e) => setFormData({ ...formData, newCityFrom: e.target.value })}
                className="..."
              />
            )}
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Pickup Spot:</label>
            <select
              value={formData.pickup}
              onChange={(e) => handleChange(e, "pickup")}
              
            >
              <option value="">Select Pickup Spot</option>
              {pickupSpots.map((spot) => (
                <option key={spot.id} value={spot.name}>{spot.name}</option>
              ))}
              <option value="other">Other (Enter Spot)</option>
            </select>
            {showCustomPickupInput && (
              <input
                type="text"
                placeholder="Enter custom pickup spot"
                value={formData.pickup || ""}
                onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
        </div>

          <div className={styles.input_group}>
          <label htmlFor="To" className={styles.label}>To:</label>
            <select
              value={formData.city_to}
              onChange={(e) => handleChange(e, "city_to")}
              
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
              <option value="new">Other (Add New City)</option>
            </select>
            {showNewCityToInput && (
              <input
                type="text"
                placeholder="Enter new city name"
                value={formData.newCityTo}
                onChange={(e) => setFormData({ ...formData, newCityTo: e.target.value })}
                className="..."
              />
            )}
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Drop Spot:</label>
              <select
                value={formData.drop}
                onChange={(e) => handleChange(e, "drop")}
                
              >
                <option value="">Select Drop Spot</option>
                {dropSpots.map((spot) => (
                  <option key={spot.id} value={spot.name}>{spot.name}</option>
                ))}
                <option value="other">Other (Enter Spot)</option>
              </select>
            {showCustomDropInput && (
              <input
                type="text"
                placeholder="Enter custom drop spot"
                value={formData.drop}
                onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          <div className={styles.input_group}>
          <label htmlFor="Date" className={styles.label}>Date:</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange(e, "date")}
                
              />
          <div className={styles.input_group}>
          <label htmlFor="Time" className={styles.label}>Time:</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange(e, "time")}
                
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
                
              />
            </div>
            <div className={styles.input_group}>
          <label htmlFor="Contact" className={styles.label}>Contact Number:</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={formData.contactNumber}
                onChange={(e) => handleChange(e, "contactNumber")}
                
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
        </>):(
        <p>Not logged in</p>
      )}
      </div>
  );
}

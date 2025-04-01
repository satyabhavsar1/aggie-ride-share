"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/"; 
;

export default function CreateRide() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    user_id: "user123",
    date: "2025-03-06",
    time: "14:30:00",
    pickups: ["Location A"],
    drops: ["Location B"],
    cost: 20,
    drop_date: "2025-03-06",
    drop_time: "16:00:00",
    num_seats: 4,
    city_from: "City A",
    city_to: "City B",
    contact_number: 1234567890,
    whatsapp_number: 1234567890,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/rides`, formData);
      alert("Ride added successfully!");
      router.push("/"); 
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Create a Ride</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">From</label>
            <input
              type="text"
              placeholder="Enter city"
              value={formData.city_from}
              onChange={(e) => handleChange(e, "city_from")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">To</label>
            <input
              type="text"
              placeholder="Enter destination"
              value={formData.city_to}
              onChange={(e) => handleChange(e, "city_to")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange(e, "date")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange(e, "time")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Cost ($)</label>
            <input
              type="number"
              placeholder="Enter cost per seat"
              value={formData.cost}
              onChange={(e) => handleChange(e, "cost")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Seats Available</label>
              <input
                type="number"
                placeholder="Enter number of seats"
                value={formData.num_seats}
                onChange={(e) => handleChange(e, "num_seats")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Contact Number</label>
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
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Ride
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";
import {Ride} from "../components/types"
import styles from "../styles/searchrides.module.css"
interface Props {
    rides: Ride[];
}


function ListRides (props: Props) {
  const handleContactClick = (contactNumber: string, from: string, to: string) => {
    const message = encodeURIComponent(`Hello, I'm interested in the ride from ${from} to ${to}. Is it still available?`);
    const smsUrl = `sms:${contactNumber}?body=${message}`;
    window.location.href = smsUrl;
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
                <button
                  onClick={() => handleContactClick(ride.contact_number, ride.city_from.name, ride.city_to.name)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}

export default ListRides;

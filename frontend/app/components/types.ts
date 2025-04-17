export interface Ride {
    id: number;
    user_id: number;
    city_from: City;
    city_to: City;
    pickups: string[];
    drops: string[];
    date: string;
    time: string;
    drop_date: string;
    drop_time:string;
    num_seats: number;
    cost: number;
    contact_number: string;
    whatsapp_number:  string;
  }

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  contact_number: string;
  email: string;
}
export interface City {
  id: number;
  name: string;
}
  
export interface RequestedRide {
  id: number;
  ride: Ride;
  requester: User;
  num_seats_requested: number;
  status: string;
}
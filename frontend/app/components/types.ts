export interface Ride {
    id: number;
    city_from: City;
    city_to: City;
    date: string;
    time: string;
    num_seats: number;
    cost: number;
    contact_number: string;
  }

  export interface City {
    id: number;
    name: string;
  }
  
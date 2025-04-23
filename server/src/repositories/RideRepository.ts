import { AppDataSource } from "../data-source";
import { Ride } from "../entities/Ride";

export const rideRepository = AppDataSource.getRepository(Ride);

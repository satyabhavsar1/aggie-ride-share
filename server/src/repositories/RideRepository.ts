import { AppDataSource } from "../data-source";
import { Ride } from "../entities/Ride";

export const RideRepository = AppDataSource.getRepository(Ride);

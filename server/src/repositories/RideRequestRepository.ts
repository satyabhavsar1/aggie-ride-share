import { AppDataSource } from "../data-source";
import { RideRequest } from "../entities/RideRequest";

export const rideRequestRepository = AppDataSource.getRepository(RideRequest);

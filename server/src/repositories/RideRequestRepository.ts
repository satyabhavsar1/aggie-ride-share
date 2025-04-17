import { AppDataSource } from "../data-source";
import { RideRequest } from "../entities/RideRequest";

export const RideRequestRepository = AppDataSource.getRepository(RideRequest);

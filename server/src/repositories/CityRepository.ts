import { AppDataSource } from "../data-source";
import { City } from "../entities/City";

export const cityRepository = AppDataSource.getRepository(City);

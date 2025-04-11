import { AppDataSource } from "../data-source";
import { City } from "../entities/City";

export const CityRepository = AppDataSource.getRepository(City);

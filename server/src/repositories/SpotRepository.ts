import { AppDataSource } from "../data-source";
import { Spot } from "../entities/Spot";

export const spotRepository = AppDataSource.getRepository(Spot);

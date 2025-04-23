import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Ride } from "./entities/Ride";
import { User } from "./entities/User";
import { City } from "./entities/City";
import { RideRequest } from "./entities/RideRequest";
import { Spot } from "./entities/Spot";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL+"?sslmode=no-verify",
  synchronize: false,  
  logging: true,
  ssl: {
    rejectUnauthorized: false
  },
  extra: {
    ssl: true
  },
  entities: [User,Ride, City, RideRequest, Spot],
  migrations: ["dist/migrations/*.js"], 
});

console.log("🌍 Running in", process.env.NODE_ENV);

console.log("SSL Config data-source.ts:", AppDataSource.options.extra);



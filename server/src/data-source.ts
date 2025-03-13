import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Ride } from "./entities/Ride";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,  
  logging: true,
  extra: process.env.NODE_ENV === "production"
    ? { ssl: { rejectUnauthorized: false } }  
    : {},
  entities: [Ride],
  migrations: ["dist/migrations/*.js"], // Use compiled JS migrations
});


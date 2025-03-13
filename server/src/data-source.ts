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
  ssl: true,
  extra: { 
    ssl: {
    rejectUnauthorized: false 
    }
  } ,
  entities: [Ride],
  migrations: ["dist/migrations/*.js"], 
});

console.log("🌍 Running in", process.env.NODE_ENV);

console.log("SSL Config data-source.ts:", AppDataSource.options.extra);



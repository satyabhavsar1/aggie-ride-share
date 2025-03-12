import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Ride } from "./entities/Ride";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  port: 5433, 
  synchronize: false,
  logging: true,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, 
  entities: [Ride],
  migrations: ["src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => console.log("✅ Database connected successfully! 🎉"))
  .catch((err) => console.error("❌ Database connection error:", err));

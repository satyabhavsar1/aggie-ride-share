import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import next from "next";
import pool from "./db"; 
import { AppDataSource } from "./data-source";
import rideRoutes from "./routes/rideRoutes";
import "reflect-metadata";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "../frontend" });
const handle = nextApp.getRequestHandler();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({ message: "Helloooooo!" });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ success: false, error: "Database connection failed" });
  }
});


nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
  });

});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected with TypeORM");

    app.use("/api/rides", rideRoutes);

    app.listen(5001, () => {
      console.log("Server running on port 5001");
    });
  })
  .catch((err) => console.error("Database connection failed:", err));

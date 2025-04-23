import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import next from "next";
import pool from "./db"; 
import { AppDataSource } from "./data-source";
import rideRoutes from "./routes/rideRoutes";
import authRoutes from "./routes/authRoutes";
import "reflect-metadata";
import cityRoutes from "./routes/cityRoutes";
import rideRequestRoutes from "./routes/rideRequestRoutes";
import spotRoutes from "./routes/spotRoutes";

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

app.use("/api", rideRoutes);
app.use("/api", authRoutes);
app.use("/api", cityRoutes);
app.use("/api", spotRoutes);
app.use("/api", rideRequestRoutes);

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    
    await nextApp.prepare();
    
    app.all("*", (req, res) => {
      return handle(req, res);
    });
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
}

startServer();
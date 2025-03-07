import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import next from "next";
import pool from "./db"; 

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
  });

});

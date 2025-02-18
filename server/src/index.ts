import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

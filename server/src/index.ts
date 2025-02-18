import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import next from "next";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./frontend" });
const handle = nextApp.getRequestHandler();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

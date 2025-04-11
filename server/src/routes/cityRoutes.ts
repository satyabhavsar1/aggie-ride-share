import express from "express";
import { City } from "../entities/City";
import { AppDataSource } from "../data-source";

const router = express.Router();

router.get("/cities/", async (_req, res) => {
    try {
        const cities = await AppDataSource.getRepository(City).find();
        res.json(cities);
        return;
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
});

export default router;

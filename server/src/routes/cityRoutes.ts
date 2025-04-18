import express from "express";
import { City } from "../entities/City";
import { AppDataSource } from "../data-source";
import { CityRepository } from "../repositories/CityRepository";

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

router.post("/cities/", async (req, res) => {
    try {
        const name = req.body;
        const newCity = await CityRepository.create(name);
        const savedCity = await CityRepository.save(newCity);
        res.status(201).json(savedCity);
        return;
    } catch (error) {
        console.error("Error creating city:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
});


export default router;

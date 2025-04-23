import express from "express";
import { spotRepository } from "../repositories/SpotRepository";
import { cityRepository } from "../repositories/CityRepository";
import { Spot } from "../entities/Spot";

const router = express.Router();
router.get("/spots/:cityid", async (req, res) => {
    const { cityid } = req.params;
  
    try {
      const spots = await spotRepository.find({
        where: { city: { id: Number(cityid) } },
        order: { name: "ASC" },
      });
  
      res.json(spots);
      return;
    } catch (error) {
      console.error("Error fetching spots:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  });

  router.post("/spots/:cityid", async (req, res) => {
    const { cityid } = req.params;
    const { name } = req.body;
    try {
        const cityRepo = cityRepository;
        const city = await cityRepo.findOneBy({ id: Number(cityid) });
    
        if (!city) {
            res.status(404).json({ error: "City not found" });
            return;
        }
    
        const existing = await spotRepository.findOne({
          where: { name, city: { id: Number(cityid) } },
        });
    
        if (existing) {
            res.status(409).json({ error: "Spot already exists in this city" });
            return;
        }
    
        const newSpot = new Spot();
        newSpot.name = name;
        newSpot.city = city;
    
        await spotRepository.save(newSpot);
        res.status(201).json({ message: "Spot created", spot: newSpot });
        return;
      } catch (err) {
        console.error("Error creating spot:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      });

  export default router;
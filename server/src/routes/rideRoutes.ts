import express from "express";
import { RideRepository } from "../repositories/RideRepository";
import { Ride } from "../entities/Ride";

const router = express.Router();

router.post("/", async (req, res) => {
  const start = Date.now();
  try {
    const ride = RideRepository.create(req.body);
    const savedRide = await RideRepository.save(ride);
    const end = Date.now();
    console.log(`Database operation took ${end - start}ms`);
    res.status(201).json(savedRide);
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

router.get("/", async (req, res) => {
  const rides = await RideRepository.find();
  res.json(rides);
});

router.get("/:id", async (req, res) => {
  const ride = await RideRepository.findOneBy({ id: parseInt(req.params.id) });
  if (ride) res.json(ride);
  else res.status(404).json({ error: "Ride not found" });
});

router.put("/:id", async (req, res) => {
  await RideRepository.update(req.params.id, req.body);
  res.json({ message: "Ride updated successfully!" });
});

router.delete("/:id", async (req, res) => {
  await RideRepository.delete(req.params.id);
  res.json({ message: "Ride deleted successfully!" });
});

export default router;

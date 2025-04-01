import express from "express";
import { RideRepository } from "../repositories/RideRepository";
import { Ride } from "../entities/Ride";

const router = express.Router();

router.post("/rides/", async (req, res) => {
  try {
    const ride = RideRepository.create(req.body);
    const savedRide = await RideRepository.save(ride);
    res.status(201).json(savedRide);
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

router.get("/rides/", async (req, res) => {
  const rides = await RideRepository.find();
  res.json(rides);
});

router.get("/rides/:id", async (req, res) => {
  const ride = await RideRepository.findOneBy({ id: parseInt(req.params.id) });
  if (ride) res.json(ride);
  else res.status(404).json({ error: "Ride not found" });
});

router.get("/rides/:userid", async (req, res) => {
  const rides = await RideRepository.findBy({ user_id: req.params.userid });
  if (rides) res.json(rides);
  else res.status(404).json({ error: "Ride not found" });
});


router.put("/rides/:id", async (req, res) => {
  await RideRepository.update(req.params.id, req.body);
  res.json({ message: "Ride updated successfully!" });
});

router.delete("/rides/:id", async (req, res) => {
  await RideRepository.delete(req.params.id);
  res.json({ message: "Ride deleted successfully!" });
});

export default router;

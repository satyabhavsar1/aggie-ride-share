import express from "express";
import { rideRepository } from "../repositories/RideRepository";

const router = express.Router();

router.post("/rides/", async (req, res) => {
  try {
    const { user, ...rideData } = req.body;
    const newRide = rideRepository.create({
      ...rideData,
      user,
    });

    const savedRide = await rideRepository.save(newRide);
    res.status(201).json(savedRide);
    return;
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

router.get("/rides/search", async (req, res) => {
  try {
      const { fromCity, toCity, date } = req.query;

      if (!fromCity || !toCity || !date) {
           res.status(400).json({ message: "All fields are required." });
           return;
      }

      const rides = await rideRepository.find({
          where: {
              city_from: { id: Number(fromCity) },
              city_to: { id: Number(toCity) },
              date: date.toString(),
          },
          relations: ["city_from", "city_to", "user"],
      });

      res.json(rides);
      return;
  } catch (error) {
      console.error("Error fetching rides:", error);
      res.status(500).json({ message: "Internal server error." });
      return;
  }
});

router.get("/rides/", async (req, res) => {
  try{
    const rides = await rideRepository.find();
    res.json(rides);
  }
  catch (error) {
    console.error("Error fetching rides:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
});

router.get("/ride/:id", async (req, res) => {
  try{
    const ride = await rideRepository.findOneBy({ id: parseInt(req.params.id) });

    if (ride) res.json(ride);
    else res.status(404).json({ error: "Ride not found" });
  } catch (error) {
    console.error("Error fetching rides:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
});

router.get("/rides/:userid", async (req, res) => {
  try{
    const rides = await rideRepository.findBy({ user_id: req.params.userid });
    if (rides) res.json(rides);
    else res.status(404).json({ error: "Ride not found" });
  } catch (error) {
    console.error("Error fetching rides:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
}
});


router.put("/ride/:id", async (req, res) => {
  try {
  await rideRepository.update(req.params.id, req.body);
  res.json({ message: "Ride updated successfully!" });
  } catch (error) {
    console.error("Error updating ride:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
}
});

export default router;

import express from "express";
import { RideRepository } from "../repositories/RideRepository";

const router = express.Router();

router.post("/rides/", async (req, res) => {
  try {
    const ride = RideRepository.create(req.body);
    const savedRide = await RideRepository.save(ride);
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

      const rides = await RideRepository.find({
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
    const rides = await RideRepository.find();
    console.log(" rides ", rides);

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
    const ride = await RideRepository.findOneBy({ id: parseInt(req.params.id) });
    console.log(" rides id", ride);

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
    const rides = await RideRepository.findBy({ user_id: req.params.userid });
    console.log("userid rides ", rides);
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
  await RideRepository.update(req.params.id, req.body);
  res.json({ message: "Ride updated successfully!" });
  } catch (error) {
    console.error("Error updating ride:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
}
});

router.delete("/ride/:id", async (req, res) => {
  try {
    await RideRepository.delete(req.params.id);
    res.json({ message: "Ride deleted successfully!" });
  } catch (error) {
    console.error("Error deleting ride:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
}
});

export default router;

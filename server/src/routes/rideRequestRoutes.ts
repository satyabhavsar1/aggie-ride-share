import express from "express";
import { RideRequestRepository } from "../repositories/RideRequestRepository";
import { UserRepository } from "../repositories/UserRepository";
import { RideRepository } from "../repositories/RideRepository";
import { RideRequest } from "../entities/RideRequest";

const router = express.Router();

router.post("/rideRequests/", async (req, res) => {
    try {
        const { userId, rideId, numSeats } = req.body;
        const user = await UserRepository.findOneBy({ id: userId });
        const ride = await RideRepository.findOneBy({ id: rideId });
    
        if (!user || !ride) {
          res.status(404).json({ message: "User or Ride not found" });
          return;
        }
    
        const rideRequest = new RideRequest();
        rideRequest.requester = user;
        rideRequest.ride = ride;
        rideRequest.status = "pending";
        rideRequest.num_seats_requested = numSeats;
    
        await RideRequestRepository.save(rideRequest);
    
        res.status(201).json(rideRequest);
        return;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
});


router.get("/rideRequests/:userid", async (req, res) => {
  try{
    const rideRequests = await RideRequestRepository.find({
        where: {
          requester: {
            id: parseInt(req.params.userid) , 
          },
        },
        relations: ["ride", "requester"], 
      });
    res.json(rideRequests);
  }
  catch (error) {
    console.error("Error fetching ride requests:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
});

export default router;
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


router.get("/rideRequests/requester/:userid", async (req, res) => {
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

router.get("/rideRequests/:userid", async (req, res) => {
  try {
    const rideRequests = await RideRequestRepository.find({
      where: {
        ride: {
          user: {
            id: parseInt(req.params.userid),
          },
        },
      },
      relations: ["ride", "ride.user", "requester"],
    });

    res.json(rideRequests);
  } catch (error) {
    console.error("Error fetching ride requests:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/rideRequests/:requestId", async (req, res) => {
      const { requestId } = req.params;
      try {
        const request = await RideRequestRepository.findOneBy({ id: parseInt(requestId) });
    
        if (!request) {
          res.status(404).json({ message: "Ride request not found" });
          return;
        }
    
        await RideRequestRepository.remove(request);
        res.status(200).json({ message: "Ride request cancelled successfully" });
        return;
      } catch (error) {
        console.error("Error cancelling ride request:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
    
});

router.put("/rideRequests/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, num_seats_requested } = req.body;

    const validStatuses = ["pending", "accepted", "declined"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status value." });
      return;
    }

    const rideRequest = await RideRequestRepository.findOne({
      where: { id: parseInt(requestId) },
      relations: ["ride", "requester"],
    });

    if (!rideRequest) {
      res.status(404).json({ message: "Ride request not found." });
      return;
    }
    const ride = rideRequest.ride;
    ride.num_seats-= num_seats_requested;
  

    rideRequest.status = status;
    await RideRequestRepository.save(rideRequest);
    await RideRepository.save(ride);
    res.json(rideRequest);
  } catch (error) {
    console.error("Error updating ride request status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
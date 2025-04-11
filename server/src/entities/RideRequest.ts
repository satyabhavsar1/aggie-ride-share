import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
  } from "typeorm";
  import { User } from "./User";
  import { Ride } from "./Ride";
  
  @Entity()
  export class RideRequest {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, (user) => user.rideRequests)
    requester!: User;
  
    @ManyToOne(() => Ride, (ride) => ride.requests)
    ride!: Ride;
  
    @CreateDateColumn()
    requestedAt!: Date;
  
    @Column({ default: "pending" }) 
    status!: string;
  }
  
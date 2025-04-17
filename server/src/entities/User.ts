import "reflect-metadata";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from "typeorm";
import { Ride } from "./Ride";
import { RideRequest } from "./RideRequest";
  
  
  @Entity({ name: "users" })
  export class User {
    @PrimaryGeneratedColumn()
      id!: number;
  
    @Column()
      firstName!: string;
  
    @Column()
      lastName!: string;
  
    @Column()
      contactNumber!: string;

    @Column()
      passwordHash!: string;
  
    @Column({
          type: "varchar",
          unique: true,
      })
      email!: string;
  
    @OneToMany(() => Ride, (ride) => ride.user)
      rides!: Ride[];
    
    @CreateDateColumn()
      registrationTime!: Date;
  
    @Column({ nullable: true })
      resetToken?: string;
  
    @CreateDateColumn()
      tokenExpirationDate!: Date;

    @Column({ default: false })
    isVerified!: boolean;
    
    @Column({ nullable: true })
    verificationCode!: string;

    @OneToMany(() => RideRequest, (request) => request.requester)
      rideRequests!: RideRequest[];
      
  }
  
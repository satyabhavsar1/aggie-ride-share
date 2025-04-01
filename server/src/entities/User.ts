import "reflect-metadata";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from "typeorm";
import { Ride } from "./Ride";
  
  
  @Entity({ name: "users" })
  export class User {
    @PrimaryGeneratedColumn()
      id!: number;
  
    @Column()
      firstName!: string;
  
    @Column()
      lastName!: string;
  
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
  }
  
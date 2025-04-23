import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Spot } from "./Spot";


@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;
    
    @OneToMany(() => Spot, (spot) => spot.city)
    spots!: Spot[];
    
}

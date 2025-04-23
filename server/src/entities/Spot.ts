import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";


@Entity()
export class Spot {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;
    
    @ManyToOne(() => City, (city) => city.spots)
    city:City;

}

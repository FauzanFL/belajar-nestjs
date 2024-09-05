import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum RoomType {
    CASUAL = "casual",
    LUXURY = "luxury"
}

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column()
    capacity: number;

    @Column({type: "enum", enum: RoomType, default: RoomType.CASUAL})
    type: RoomType;

    @Column({length: 20})
    price: string;

    @Column()
    ready: boolean;

    @OneToMany(() => Reservation, (reservation) => reservation.room)
    reservations: Reservation[]

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;
    
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updatedAt: Date;
}

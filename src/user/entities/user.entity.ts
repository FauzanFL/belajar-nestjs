import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({unique: true, length:50})
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[]

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;
    
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updatedAt: Date;
}

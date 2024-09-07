import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: "timestamp"})
    date: Date

    @Column()
    duration: number

    @Column({length: 20})
    phone: string
    
    @Column()
    total: number

    @CreateDateColumn({type: "timestamp"})
    start: Date

    @CreateDateColumn({type: "timestamp"})
    end: Date

    @ManyToOne(() => Room, (room) => room.reservations)
    room: Room

    @ManyToOne(() => User, (user) => user.reservations)
    user: User
}

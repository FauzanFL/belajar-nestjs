import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>) {}

  async create(createReservationDto: CreateReservationDto, room: Room, user: User) {
    
    const newReservation = await this.reservationRepository.save({...createReservationDto, user, room}, {})
    console.log(newReservation)
    room.reservations = [newReservation, ...room.reservations]
    user.reservations = [newReservation, ...user.reservations]
    return newReservation;
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find({relations: {user: true, room: true}});
  }

  async findOne(id: number): Promise<Reservation> {
    return await this.reservationRepository.findOneBy({id, user: true, room: true});
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.update({id}, updateReservationDto);
  }

  async remove(id: number) {
    return await this.reservationRepository.delete({id});
  }
}

import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, RoomService, UserService],
  imports: [TypeOrmModule.forFeature([Reservation, Room, User])]
})
export class ReservationModule {}

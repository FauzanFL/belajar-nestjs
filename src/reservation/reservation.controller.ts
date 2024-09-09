import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/reservations')
@ApiTags('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService, private readonly userService: UserService, private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    const room = await this.roomService.findOne(createReservationDto.roomId)
    const user = await this.userService.findOne(createReservationDto.userId)
    return await this.reservationService.create(createReservationDto, room, user);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.remove(+id);
  }
}

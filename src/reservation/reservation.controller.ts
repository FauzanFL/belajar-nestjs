import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Role } from 'src/decorators/roles.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@UseGuards(AuthenticationGuard)
@Controller('api/reservations')
@ApiTags('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService, private readonly userService: UserService, private readonly roomService: RoomService) {}

  @Role('user')
  @UseGuards(AuthorizationGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createReservationDto: CreateReservationDto) {
    const room = await this.roomService.findOne(createReservationDto.roomId)
    if (!room) {
      throw new HttpException("room not found", HttpStatus.NOT_FOUND)
    }
    const user = await this.userService.findOne(createReservationDto.userId)
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }
    await this.reservationService.create(createReservationDto, room, user)
    return {message: "Reservation created successfully"};
  }

  @Role('admin')
  @UseGuards(AuthorizationGuard)
  @Get()
  async findAll() {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const reservation = await this.reservationService.findOne(id)
    if (!reservation) {
      throw new HttpException("reservation not found", HttpStatus.NOT_FOUND)
    }
    return reservation;
  }

  @Role('admin')
  @UseGuards(AuthorizationGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationService.findOne(id)
    if (!reservation) {
      throw new HttpException("reservation not found", HttpStatus.NOT_FOUND)
    }
    await this.reservationService.update(+id, updateReservationDto)
    return {message: "Reservation updated successfully"};
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const reservation = await this.reservationService.findOne(id)
    if (!reservation) {
      throw new HttpException("reservation not found", HttpStatus.NOT_FOUND)
    }
    await this.reservationService.remove(id)
    return {message: "Reservation deleted successfully"};
  }
}

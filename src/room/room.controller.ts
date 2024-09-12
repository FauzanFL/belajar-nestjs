import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/rooms')
@ApiTags('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createRoomDto: CreateRoomDto) {
    const data = {...createRoomDto, ready: true}
    await this.roomService.create(data)
    return {message: "Room created successfully"};
  }

  @Get()
  async findAll() {
    return await this.roomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const room = await this.roomService.findOne(id)
    if (!room) {
      throw new HttpException("room not found", HttpStatus.NOT_FOUND)
    }
    return room;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateRoomDto: UpdateRoomDto) {
    const room = await this.roomService.findOne(id)
    if (!room) {
      throw new HttpException("room not found", HttpStatus.NOT_FOUND)
    }
    await this.roomService.update(id, updateRoomDto)
    return {message: "Room updated successfully"};
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const room = await this.roomService.findOne(id)
    if (!room) {
      throw new HttpException("room not found", HttpStatus.NOT_FOUND)
    }
    await this.roomService.remove(id)
    return {message: "Room deleted successfully"};
  }
}

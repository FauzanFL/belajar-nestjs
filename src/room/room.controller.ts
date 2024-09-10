import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/rooms')
@ApiTags('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.create(createRoomDto);
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

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRoomDto: UpdateRoomDto) {
    const room = await this.roomService.findOne(id)
    if (!room) {
      throw new HttpException("room not found", HttpStatus.NOT_FOUND)
    }
    return await this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const room = await this.roomService.findOne(id)
    if (!room) {
      throw new HttpException("room not found", HttpStatus.NOT_FOUND)
    }
    return await this.roomService.remove(id);
  }
}

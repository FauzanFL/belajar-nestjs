import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Role } from 'src/decorators/roles.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Controller('api/rooms')
@ApiTags('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  
  @Role('admin')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
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

  @Role('admin')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateRoomDto: UpdateRoomDto) {
    const room = await this.roomService.findOne(id)
    if (!room) {
      throw new HttpException("room not found", HttpStatus.NOT_FOUND)
    }
    await this.roomService.update(id, updateRoomDto)
    return {message: "Room updated successfully"};
  }

  @Role('admin')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
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

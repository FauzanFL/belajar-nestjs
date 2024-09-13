import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private readonly roomRepository: Repository<Room>) {}

  async create(createRoomDto: CreateRoomDto) {
    return await this.roomRepository.save(createRoomDto);
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find({order: {id: "DESC"}})
  }

  async findOne(id: number): Promise<Room> {
    return await this.roomRepository.findOneBy({id, reservations: true});
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return await this.roomRepository.update({id}, updateRoomDto);
  }

  async remove(id: number) {
    return await this.roomRepository.delete({id});
  }
}

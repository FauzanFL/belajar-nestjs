import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
  
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({relations: {reservations: true}});
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({id, reservations: true});
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({username})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({id}, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete({id});
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { hash } from 'bcrypt';

@Controller('api/users')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = this.userService.findByUsername(createUserDto.username)
    if (user) {
      throw new HttpException("username has been taken", HttpStatus.BAD_REQUEST)
    }
    const passwordEncrypt = await hash(createUserDto.password, 10)
    const data = {...createUserDto}
    data.password = passwordEncrypt
    return await this.userService.create(data);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }
    return user;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
    const data = {...updateUserDto}
    const userById = await this.userService.findOne(id)
    if (!userById) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }

    if (updateUserDto.username && updateUserDto.username != userById.username) {
      const user = this.userService.findByUsername(updateUserDto.username)
      if (user) {
        throw new HttpException("username has been taken", HttpStatus.BAD_REQUEST)
      }
    }

    if(updateUserDto.password) {
      const passwordEncrypt = await hash(updateUserDto.password, 10)
      data.password = passwordEncrypt
    }
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }
    return await this.userService.remove(id);
  }
}

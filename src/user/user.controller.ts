import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Role } from 'src/decorators/roles.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@UseGuards(AuthenticationGuard)
@Controller('api/users')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  
  @Role('admin')
  @UseGuards(AuthorizationGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.userService.findByUsername(createUserDto.username)
    if (user) {
      throw new HttpException("username has been taken", HttpStatus.BAD_REQUEST)
    }
    const passwordEncrypt = await hash(createUserDto.password, 10)
    const data = {...createUserDto}
    data.password = passwordEncrypt
    await this.userService.create(data)
    return {message: "User created successfully"};
  }
  
  @Role('admin')
  @UseGuards(AuthorizationGuard)
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

  @Role('user')
  @UseGuards(AuthorizationGuard)
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

    await this.userService.update(id, data)
    return {message: "User updated successfully"};
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }
    await this.userService.remove(id)
    return {message: "User deleted successfully"};
  }
}

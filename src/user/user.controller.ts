import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { UserRole } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('api/users')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.userService.findByUsername(createUserDto.username)
    if (user) {
      throw new HttpException("username has been taken", HttpStatus.BAD_REQUEST)
    }
    const passwordEncrypt = await hash(createUserDto.password, 10)
    const data = {...createUserDto, role: UserRole.USER}
    data.password = passwordEncrypt
    await this.userService.create(data)
    return {message: "User created successfully"};
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

  @Post('/login')
  async login(@Res({passthrough: true}) res: Response, @Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    const user = await this.userService.findByUsername(loginUserDto.username)
    if (!user) {
      throw new HttpException("username or password is wrong", HttpStatus.BAD_REQUEST)
    }

    const isPasswordMatch = await compare(loginUserDto.password, user.password)
    if (!isPasswordMatch) {
      throw new HttpException("username or password is wrong", HttpStatus.BAD_REQUEST)
    }

    const token = await this.jwtService.signAsync({id: user.id})

    // set cookie
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12)
    })

    return {message: "Login successful", token}
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response) {
    // remove cookie
    res.cookie("token", "", {
      expires: new Date(Date.now() - 1000 * 60 * 60)
    })

    return {message: "Logout succcessful"}
  }
}

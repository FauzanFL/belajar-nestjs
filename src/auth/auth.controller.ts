import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ){}
    
    @Post('/login')
    @HttpCode(200)
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
    @HttpCode(200)
    async logout(@Res({passthrough: true}) res: Response) {
        // remove cookie
        res.clearCookie('token')

        return {message: "Logout succcessful"}
    }
}

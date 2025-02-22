import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
    controllers: [AuthController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}

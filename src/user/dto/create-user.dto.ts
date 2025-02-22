import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, Length } from "class-validator"
import { UserRole } from "../entities/user.entity"

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(3)
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @Length(3)
    name: string

    @IsNotEmpty()
    @ApiProperty()
    @Length(6)
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
}

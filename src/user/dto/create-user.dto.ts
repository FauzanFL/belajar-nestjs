import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, Length } from "class-validator"

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
}

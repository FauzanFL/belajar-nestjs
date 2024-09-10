import { ApiProperty } from "@nestjs/swagger";
import { RoomType } from "../entities/room.entity";
import { IsEnum, IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateRoomDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(4)
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    capacity: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(RoomType)
    type: RoomType;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;
}

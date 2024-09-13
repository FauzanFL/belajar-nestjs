import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateReservationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    duration: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(10,20)
    phone: string;
    
    @ApiProperty()
    @IsNotEmpty()
    total: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    start: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    end: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    roomId: number;
}

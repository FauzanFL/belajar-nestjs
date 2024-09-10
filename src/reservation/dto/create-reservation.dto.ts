import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateReservationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
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
    @IsDate()
    start: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
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

import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationDto {
    @ApiProperty()
    date: Date;

    @ApiProperty()
    duration: number;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    total: number;

    @ApiProperty()
    start: Date;

    @ApiProperty()
    end: Date;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    roomId: number;
}

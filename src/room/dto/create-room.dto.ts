import { ApiProperty } from "@nestjs/swagger";
import { RoomType } from "../entities/room.entity";

export class CreateRoomDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    capacity: number;

    @ApiProperty()
    type: RoomType;

    @ApiProperty()
    price: number;

    @ApiProperty()
    ready: boolean;
}

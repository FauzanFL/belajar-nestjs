import { RoomType } from "../entities/room.entity";

export class CreateRoomDto {
    name: string;
    capacity: number;
    type: RoomType;
    price: number;
    ready: boolean;
}

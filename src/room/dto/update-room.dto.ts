import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @ApiProperty({required: false})
    @IsNotEmpty()
    @IsBoolean()
    ready: boolean;
}

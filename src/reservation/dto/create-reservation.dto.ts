export class CreateReservationDto {
    date: Date;
    duration: number;
    phone: string;
    total: number;
    start: Date;
    end: Date;

    userId: number;
    roomId: number;
}

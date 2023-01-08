import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateEventDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsOptional()
  @IsString()
  eventDescription?: string;

  @IsEnum(['RemoteWork', 'PaidLeave'])
  @IsNotEmpty()
  eventType: 'RemoteWork' | 'PaidLeave';
}

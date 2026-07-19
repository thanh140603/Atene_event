import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SlotDto {
  @IsString()
  date: string;

  @IsString()
  start: string;

  @IsString()
  end: string;
}

export class CreateBookingDto {
  @IsOptional()
  @IsString()
  creatorName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  dates: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  slots: SlotDto[];
}

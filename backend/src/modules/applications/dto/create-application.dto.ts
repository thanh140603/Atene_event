import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  preferredBrand: string;

  @IsOptional()
  @IsString()
  preferredBrandOther?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  liveCommerceBrands: string[];

  @IsOptional()
  @IsString()
  comment?: string;
}

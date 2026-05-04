import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  vendorSlug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  packageId?: string;

  @ApiProperty()
  @IsString()
  eventType: string;

  @ApiProperty()
  @IsDateString()
  eventDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  eventTime?: string;

  @ApiProperty()
  @IsString()
  eventCity: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  eventLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  guestCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ConfirmBookingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceAreaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  area?: string;
}

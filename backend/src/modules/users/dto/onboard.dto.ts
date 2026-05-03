import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OnboardVendorDto {
  @ApiProperty({ example: 'Glamour Beauty Salon' })
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty({ example: 'glamour-beauty-salon' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Lahore' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional({ example: '+923001234567' })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class OnboardClientDto {
  @ApiProperty({ example: 'Lahore' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional({ example: '+923001234567' })
  @IsString()
  @IsOptional()
  phone?: string;
}

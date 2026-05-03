import { IsString, IsOptional, IsUrl, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVendorProfileDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  businessName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  tagline?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  whatsappNumber?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  instagramUrl?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  facebookUrl?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  logo?: string;
}

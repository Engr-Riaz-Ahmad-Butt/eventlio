import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VendorProfilesService } from './vendor-profiles.service';
import { UpdateVendorProfileDto } from './dto/update-vendor-profile.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Public, Roles, CurrentUser } from '../../common/decorators';
import { Role } from '@prisma/client';

@ApiTags('Vendor Profiles')
@Controller('vendor-profiles')
export class VendorProfilesController {
  constructor(private readonly vendorProfilesService: VendorProfilesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Search and filter vendor profiles' })
  async findAll(
    @Query('city') city?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    return this.vendorProfilesService.findAll({ city, category, search });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @Get('me/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current vendor own profile' })
  async getMyProfile(@CurrentUser('id') userId: string) {
    return this.vendorProfilesService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @Patch('me/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update the current vendor own profile' })
  async updateMe(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateVendorProfileDto,
  ) {
    return this.vendorProfilesService.update(userId, dto);
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Get a public vendor profile by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.vendorProfilesService.findBySlug(slug);
  }
}

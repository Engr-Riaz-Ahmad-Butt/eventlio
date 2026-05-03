import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VendorPackagesService } from './vendor-packages.service';
import { CreatePackageDto, UpdatePackageDto } from './dto/package.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser, Public } from '../../common/decorators';
import { Role } from '@prisma/client';

@ApiTags('Vendor Packages')
@Controller('vendor-packages')
export class VendorPackagesController {
  constructor(private readonly vendorPackagesService: VendorPackagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new vendor package' })
  async create(@CurrentUser('id') userId: string, @Body() dto: CreatePackageDto) {
    return this.vendorPackagesService.create(userId, dto);
  }

  @Public()
  @Get('vendor/:vendorId')
  @ApiOperation({ summary: 'Get all packages for a vendor' })
  async findAll(@Param('vendorId') vendorId: string) {
    return this.vendorPackagesService.findAll(vendorId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a vendor package' })
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePackageDto,
  ) {
    return this.vendorPackagesService.update(userId, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a vendor package' })
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.vendorPackagesService.remove(userId, id);
  }
}

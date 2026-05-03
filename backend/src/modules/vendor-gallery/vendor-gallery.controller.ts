import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VendorGalleryService } from './vendor-gallery.service';
import { CreateGalleryItemDto } from './dto/gallery.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser, Public } from '../../common/decorators';
import { Role } from '@prisma/client';

@ApiTags('Vendor Gallery')
@Controller('vendor-gallery')
export class VendorGalleryController {
  constructor(private readonly vendorGalleryService: VendorGalleryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add an item to the vendor gallery' })
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateGalleryItemDto,
  ) {
    return this.vendorGalleryService.create(userId, dto);
  }

  @Public()
  @Get('vendor/:vendorId')
  @ApiOperation({ summary: 'Get all gallery items for a vendor' })
  async findAll(@Param('vendorId') vendorId: string) {
    return this.vendorGalleryService.findAll(vendorId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a gallery item' })
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.vendorGalleryService.remove(userId, id);
  }
}

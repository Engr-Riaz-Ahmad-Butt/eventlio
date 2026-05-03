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
import { ServiceAreasService } from './service-areas.service';
import { CreateServiceAreaDto } from './dto/service-area.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser, Public } from '../../common/decorators';
import { Role } from '@prisma/client';

@ApiTags('Service Areas')
@Controller('service-areas')
export class ServiceAreasController {
  constructor(private readonly serviceAreasService: ServiceAreasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a service area for a vendor' })
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateServiceAreaDto,
  ) {
    return this.serviceAreasService.create(userId, dto);
  }

  @Public()
  @Get('vendor/:vendorId')
  @ApiOperation({ summary: 'Get all service areas for a vendor' })
  async findAll(@Param('vendorId') vendorId: string) {
    return this.serviceAreasService.findAll(vendorId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a service area' })
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.serviceAreasService.remove(userId, id);
  }
}

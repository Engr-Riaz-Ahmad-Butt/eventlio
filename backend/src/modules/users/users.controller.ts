import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto, OnboardVendorDto, OnboardClientDto } from './dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Role } from '@prisma/client';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getMe(@CurrentUser('id') userId: string) {
    return this.usersService.findById(userId);
  }

  @Post('onboard/vendor')
  @Roles(Role.VENDOR_OWNER)
  @ApiOperation({ summary: 'Initialize vendor profile' })
  async onboardVendor(
    @CurrentUser('id') userId: string,
    @Body() dto: OnboardVendorDto,
  ) {
    return this.usersService.onboardVendor(userId, dto);
  }

  @Post('onboard/client')
  @Roles(Role.CLIENT)
  @ApiOperation({ summary: 'Initialize client profile' })
  async onboardClient(
    @CurrentUser('id') userId: string,
    @Body() dto: OnboardClientDto,
  ) {
    return this.usersService.onboardClient(userId, dto);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateMe(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'List all users (admin only)' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.usersService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }
}

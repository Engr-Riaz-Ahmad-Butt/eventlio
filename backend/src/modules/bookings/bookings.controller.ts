import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { BookingsService } from './bookings.service';
import { ConfirmBookingDto } from './dto/confirm-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RespondBookingDto } from './dto/respond-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENT)
  @Post('request')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a client booking request' })
  createRequest(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.createBookingRequest(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENT)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current client booking history' })
  getClientBookings(@CurrentUser('id') userId: string) {
    return this.bookingsService.getClientBookings(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER, Role.VENDOR_STAFF)
  @Get('vendor/me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current vendor booking management list' })
  getVendorBookings(@CurrentUser('id') userId: string) {
    return this.bookingsService.getVendorBookings(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENT)
  @Patch(':id/confirm')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Confirm an accepted booking request' })
  confirm(
    @CurrentUser('id') userId: string,
    @Param('id') bookingId: string,
    @Body() dto: ConfirmBookingDto,
  ) {
    return this.bookingsService.confirmClientBooking(userId, bookingId, dto.note);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR_OWNER, Role.VENDOR_STAFF)
  @Patch(':id/respond')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accept or reject a vendor booking request' })
  respond(
    @CurrentUser() user: { id: string; role: Role },
    @Param('id') bookingId: string,
    @Body() dto: RespondBookingDto,
  ) {
    return this.bookingsService.respondToBooking(user, bookingId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENT)
  @Patch(':id/cancel')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel a client booking request' })
  cancel(
    @CurrentUser('id') userId: string,
    @Param('id') bookingId: string,
    @Body('note') note?: string,
  ) {
    return this.bookingsService.cancelClientBooking(userId, bookingId, note);
  }
}

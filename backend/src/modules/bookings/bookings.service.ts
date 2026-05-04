import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RespondBookingDto } from './dto/respond-booking.dto';

const BOOKING_INCLUDE = {
  vendor: {
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  },
  client: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  },
  package: true,
  statusHistory: {
    orderBy: {
      createdAt: 'asc',
    },
  },
} satisfies Prisma.BookingInclude;

type BookingRecord = Prisma.BookingGetPayload<{ include: typeof BOOKING_INCLUDE }>;

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  private async resolveVendorAccess(userId: string) {
    const vendorOwner = await this.prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (vendorOwner) {
      return vendorOwner;
    }

    const vendorStaff = await this.prisma.vendorStaff.findFirst({
      where: { userId },
      include: {
        vendor: true,
      },
    });

    return vendorStaff?.vendor ?? null;
  }

  async createBookingRequest(userId: string, dto: CreateBookingDto) {
    const client = await this.prisma.clientProfile.findUnique({
      where: { userId },
    });

    if (!client) {
      throw new ForbiddenException('Only clients can create booking requests');
    }

    const vendor = await this.prisma.vendorProfile.findFirst({
      where: {
        slug: dto.vendorSlug,
        status: 'APPROVED',
        isPublic: true,
      },
      include: {
        packages: {
          where: { isActive: true },
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const selectedPackage = dto.packageId
      ? vendor.packages.find((item) => item.id === dto.packageId)
      : vendor.packages.sort((a, b) => a.price - b.price)[0];

    if (dto.packageId && !selectedPackage) {
      throw new BadRequestException('Selected package not found for this vendor');
    }

    const eventDate = new Date(dto.eventDate);
    if (Number.isNaN(eventDate.getTime())) {
      throw new BadRequestException('Invalid event date');
    }

    const blockedDate = await this.prisma.blockedDate.findFirst({
      where: {
        vendorId: vendor.id,
        date: eventDate,
      },
    });

    if (blockedDate) {
      throw new BadRequestException('Vendor is unavailable on the selected date');
    }

    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        vendorId: vendor.id,
        eventDate,
        status: {
          in: [
            BookingStatus.PENDING,
            BookingStatus.ACCEPTED,
            BookingStatus.CONFIRMED,
            BookingStatus.COMPLETED,
          ],
        },
      },
    });

    if (conflictingBooking) {
      throw new BadRequestException('Vendor already has a booking conflict on this date');
    }

    const totalAmount = selectedPackage?.discountPrice ?? selectedPackage?.price ?? 0;

    const booking = await this.prisma.$transaction(async (tx) => {
      const created = await tx.booking.create({
        data: {
          clientId: client.id,
          vendorId: vendor.id,
          packageId: selectedPackage?.id,
          eventType: dto.eventType,
          eventDate,
          eventTime: dto.eventTime,
          eventCity: dto.eventCity,
          eventLocation: dto.eventLocation,
          guestCount: dto.guestCount,
          notes: dto.notes,
          totalAmount,
          advanceAmount: 0,
          balanceAmount: totalAmount,
          status: BookingStatus.PENDING,
        },
        include: BOOKING_INCLUDE,
      });

      await tx.bookingStatusHistory.create({
        data: {
          bookingId: created.id,
          fromStatus: null,
          toStatus: BookingStatus.PENDING,
          changedBy: userId,
          note: 'Booking request created by client',
        },
      });

      return tx.booking.findUniqueOrThrow({
        where: { id: created.id },
        include: BOOKING_INCLUDE,
      });
    });

    return this.serializeBooking(booking);
  }

  async getClientBookings(userId: string) {
    const client = await this.prisma.clientProfile.findUnique({
      where: { userId },
    });

    if (!client) {
      throw new ForbiddenException('Only clients can view client bookings');
    }

    const bookings = await this.prisma.booking.findMany({
      where: { clientId: client.id },
      include: BOOKING_INCLUDE,
      orderBy: [{ eventDate: 'asc' }, { createdAt: 'desc' }],
    });

    return bookings.map((booking) => this.serializeBooking(booking));
  }

  async getVendorBookings(userId: string) {
    const vendor = await this.resolveVendorAccess(userId);

    if (!vendor) {
      throw new ForbiddenException('Only vendor accounts can view vendor bookings');
    }

    const bookings = await this.prisma.booking.findMany({
      where: { vendorId: vendor.id },
      include: BOOKING_INCLUDE,
      orderBy: [{ status: 'asc' }, { eventDate: 'asc' }],
    });

    return bookings.map((booking) => this.serializeBooking(booking));
  }

  async confirmClientBooking(userId: string, bookingId: string, note?: string) {
    const client = await this.prisma.clientProfile.findUnique({
      where: { userId },
    });

    if (!client) {
      throw new ForbiddenException('Only clients can confirm bookings');
    }

    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: BOOKING_INCLUDE,
    });

    if (!booking || booking.clientId !== client.id) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new BadRequestException('Only accepted bookings can be confirmed');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.booking.update({
        where: { id: booking.id },
        data: {
          status: BookingStatus.CONFIRMED,
        },
      });

      await tx.bookingStatusHistory.create({
        data: {
          bookingId: booking.id,
          fromStatus: booking.status,
          toStatus: BookingStatus.CONFIRMED,
          changedBy: userId,
          note: note ?? 'Client confirmed the accepted booking',
        },
      });

      return tx.booking.findUniqueOrThrow({
        where: { id: booking.id },
        include: BOOKING_INCLUDE,
      });
    });

    return this.serializeBooking(updated);
  }

  async respondToBooking(
    user: { id: string; role: Role },
    bookingId: string,
    dto: RespondBookingDto,
  ) {
    const vendor = await this.resolveVendorAccess(user.id);

    if (!vendor) {
      throw new ForbiddenException('Only vendor accounts can respond to bookings');
    }

    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: BOOKING_INCLUDE,
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.vendorId !== vendor.id) {
      throw new ForbiddenException('You cannot manage another vendor booking');
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Only pending bookings can be accepted or rejected');
    }

    const updateData: Prisma.BookingUpdateInput =
      dto.decision === BookingStatus.REJECTED
        ? {
            status: BookingStatus.REJECTED,
            rejectionReason: dto.note,
          }
        : {
            status: BookingStatus.ACCEPTED,
          };

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.booking.update({
        where: { id: booking.id },
        data: updateData,
      });

      await tx.bookingStatusHistory.create({
        data: {
          bookingId: booking.id,
          fromStatus: booking.status,
          toStatus: dto.decision,
          changedBy: user.id,
          note: dto.note,
        },
      });

      return tx.booking.findUniqueOrThrow({
        where: { id: booking.id },
        include: BOOKING_INCLUDE,
      });
    });

    return this.serializeBooking(updated);
  }

  async cancelClientBooking(userId: string, bookingId: string, note?: string) {
    const client = await this.prisma.clientProfile.findUnique({
      where: { userId },
    });

    if (!client) {
      throw new ForbiddenException('Only clients can cancel bookings');
    }

    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.clientId !== client.id) {
      throw new NotFoundException('Booking not found');
    }

    if (
      booking.status !== BookingStatus.PENDING &&
      booking.status !== BookingStatus.ACCEPTED
    ) {
      throw new BadRequestException('This booking can no longer be cancelled by the client');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.booking.update({
        where: { id: booking.id },
        data: {
          status: BookingStatus.CANCELLED,
          cancelledBy: 'CLIENT',
          cancelReason: note,
        },
      });

      await tx.bookingStatusHistory.create({
        data: {
          bookingId: booking.id,
          fromStatus: booking.status,
          toStatus: BookingStatus.CANCELLED,
          changedBy: userId,
          note,
        },
      });

      return tx.booking.findUniqueOrThrow({
        where: { id: booking.id },
        include: BOOKING_INCLUDE,
      });
    });

    return this.serializeBooking(updated);
  }

  private serializeBooking(booking: BookingRecord) {
    return {
      id: booking.id,
      clientId: booking.clientId,
      vendorId: booking.vendorId,
      packageId: booking.packageId,
      status: booking.status,
      eventType: booking.eventType,
      eventDate: booking.eventDate,
      eventTime: booking.eventTime,
      eventCity: booking.eventCity,
      eventLocation: booking.eventLocation,
      guestCount: booking.guestCount,
      notes: booking.notes,
      totalAmount: booking.totalAmount,
      advanceAmount: booking.advanceAmount,
      balanceAmount: booking.balanceAmount,
      rejectionReason: booking.rejectionReason,
      cancelledBy: booking.cancelledBy,
      cancelReason: booking.cancelReason,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      package: booking.package,
      vendor: {
        id: booking.vendor.id,
        slug: booking.vendor.slug,
        businessName: booking.vendor.businessName,
        city: booking.vendor.city,
        coverImage: booking.vendor.coverImage,
        category: booking.vendor.categories[0]?.category
          ? {
              name: booking.vendor.categories[0].category.name,
              slug: booking.vendor.categories[0].category.slug,
            }
          : null,
      },
      client: {
        id: booking.client.id,
        name: booking.client.user.name,
        email: booking.client.user.email,
      },
      statusHistory: booking.statusHistory,
    };
  }
}

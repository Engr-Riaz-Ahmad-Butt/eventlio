import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        vendorProfile: true,
        clientProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, otp, otpExpiresAt, refreshToken, ...sanitized } = user;
    return sanitized;
  }

  async onboardVendor(userId: string, dto: import('./dto').OnboardVendorDto) {
    const existing = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (existing) {
      throw new import('@nestjs/common').ConflictException('Vendor profile already exists');
    }

    const slugExists = await this.prisma.vendorProfile.findUnique({ where: { slug: dto.slug } });
    if (slugExists) {
      throw new import('@nestjs/common').ConflictException('Slug is already taken');
    }

    const profile = await this.prisma.vendorProfile.create({
      data: {
        userId,
        businessName: dto.businessName,
        slug: dto.slug,
        city: dto.city,
        phone: dto.phone,
      },
    });

    return profile;
  }

  async onboardClient(userId: string, dto: import('./dto').OnboardClientDto) {
    const existing = await this.prisma.clientProfile.findUnique({ where: { userId } });
    if (existing) {
      // Return existing since client profiles were created on registration in the auth service previously.
      return this.prisma.clientProfile.update({
        where: { userId },
        data: dto,
      });
    }

    const profile = await this.prisma.clientProfile.create({
      data: {
        userId,
        ...dto,
      },
    });

    return profile;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
    });

    const { passwordHash, otp, otpExpiresAt, refreshToken, ...sanitized } = updated;
    return sanitized;
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isEmailVerified: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

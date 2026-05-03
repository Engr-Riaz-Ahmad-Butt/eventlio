import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdateVendorProfileDto } from './dto/update-vendor-profile.dto';

@Injectable()
export class VendorProfilesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { city?: string; category?: string; search?: string }) {
    const { city, category, search } = query;

    return this.prisma.vendorProfile.findMany({
      where: {
        status: 'APPROVED',
        city: city ? { contains: city, mode: 'insensitive' } : undefined,
        categories: category
          ? { some: { category: { slug: category } } }
          : undefined,
        OR: search
          ? [
              { businessName: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      include: {
        categories: { include: { category: true } },
        _count: { select: { reviews: true } },
      },
      orderBy: { isFeatured: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { slug },
      include: {
        categories: { include: { category: true } },
        packages: { where: { isActive: true } },
        gallery: { orderBy: { sortOrder: 'asc' } },
        serviceAreas: true,
        reviews: {
          where: { isApproved: true },
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { client: { include: { user: true } } },
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor;
  }

  async findByUserId(userId: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { userId },
      include: {
        categories: { include: { category: true } },
        packages: true,
        gallery: true,
        serviceAreas: true,
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    return vendor;
  }

  async update(userId: string, dto: UpdateVendorProfileDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    return this.prisma.vendorProfile.update({
      where: { userId },
      data: dto,
    });
  }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateGalleryItemDto } from './dto/gallery.dto';

@Injectable()
export class VendorGalleryService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateGalleryItemDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    return this.prisma.vendorGallery.create({
      data: {
        vendorId: vendor.id,
        ...dto,
      },
    });
  }

  async findAll(vendorId: string) {
    return this.prisma.vendorGallery.findMany({
      where: { vendorId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async remove(userId: string, id: string) {
    const item = await this.prisma.vendorGallery.findUnique({
      where: { id },
      include: { vendor: true },
    });

    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }

    if (item.vendor.userId !== userId) {
      throw new ForbiddenException('Not allowed to delete this item');
    }

    return this.prisma.vendorGallery.delete({
      where: { id },
    });
  }
}

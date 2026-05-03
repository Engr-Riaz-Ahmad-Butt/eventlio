import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePackageDto, UpdatePackageDto } from './dto/package.dto';

@Injectable()
export class VendorPackagesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreatePackageDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    return this.prisma.vendorPackage.create({
      data: {
        vendorId: vendor.id,
        ...dto,
      },
    });
  }

  async findAll(vendorId: string) {
    return this.prisma.vendorPackage.findMany({
      where: { vendorId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async update(userId: string, id: string, dto: UpdatePackageDto) {
    const pkg = await this.prisma.vendorPackage.findUnique({
      where: { id },
      include: { vendor: true },
    });

    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    if (pkg.vendor.userId !== userId) {
      throw new ForbiddenException('Not allowed to update this package');
    }

    return this.prisma.vendorPackage.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    const pkg = await this.prisma.vendorPackage.findUnique({
      where: { id },
      include: { vendor: true },
    });

    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    if (pkg.vendor.userId !== userId) {
      throw new ForbiddenException('Not allowed to delete this package');
    }

    return this.prisma.vendorPackage.delete({
      where: { id },
    });
  }
}

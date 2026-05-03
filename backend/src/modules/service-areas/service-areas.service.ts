import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateServiceAreaDto } from './dto/service-area.dto';

@Injectable()
export class ServiceAreasService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateServiceAreaDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    return this.prisma.serviceArea.create({
      data: {
        vendorId: vendor.id,
        ...dto,
      },
    });
  }

  async findAll(vendorId: string) {
    return this.prisma.serviceArea.findMany({
      where: { vendorId },
    });
  }

  async remove(userId: string, id: string) {
    const area = await this.prisma.serviceArea.findUnique({
      where: { id },
      include: { vendor: true },
    });

    if (!area) {
      throw new NotFoundException('Service area not found');
    }

    if (area.vendor.userId !== userId) {
      throw new ForbiddenException('Not allowed to delete this area');
    }

    return this.prisma.serviceArea.delete({
      where: { id },
    });
  }
}

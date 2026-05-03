import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (dto.slug) {
      const existingSlug = await this.prisma.vendorProfile.findFirst({
        where: {
          slug: dto.slug,
          userId: { not: userId },
        },
      });

      if (existingSlug) {
        throw new BadRequestException('This vendor URL is already in use');
      }
    }

    const {
      categoryIds,
      serviceAreas,
      ...profileData
    } = dto;

    const existing = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    const businessName = profileData.businessName ?? existing?.businessName;
    const slug = profileData.slug ?? existing?.slug;
    const city = profileData.city ?? existing?.city;

    if (!businessName || !slug || !city) {
      throw new BadRequestException('Business name, city, and slug are required');
    }

    const profileCompletion = this.calculateProfileCompletion({
      ...existing,
      ...profileData,
      categoryIds,
      serviceAreas,
    });

    const updated = await this.prisma.$transaction(async (tx) => {
      const vendor = await tx.vendorProfile.upsert({
        where: { userId },
        create: {
          userId,
          businessName,
          slug,
          city,
          description: profileData.description,
          tagline: profileData.tagline,
          address: profileData.address,
          phone: profileData.phone,
          whatsappNumber: profileData.whatsappNumber,
          instagramUrl: profileData.instagramUrl,
          facebookUrl: profileData.facebookUrl,
          websiteUrl: profileData.websiteUrl,
          coverImage: profileData.coverImage,
          logo: profileData.logo,
          isPublic: profileData.isPublic ?? true,
          profileCompletion,
        },
        update: {
          ...profileData,
          businessName,
          slug,
          city,
          profileCompletion,
        },
      });

      if (categoryIds) {
        await tx.vendorCategory.deleteMany({ where: { vendorId: vendor.id } });
        if (categoryIds.length > 0) {
          await tx.vendorCategory.createMany({
            data: categoryIds.map((categoryId) => ({
              vendorId: vendor.id,
              categoryId,
            })),
            skipDuplicates: true,
          });
        }
      }

      if (serviceAreas) {
        await tx.serviceArea.deleteMany({ where: { vendorId: vendor.id } });
        if (serviceAreas.length > 0) {
          await tx.serviceArea.createMany({
            data: serviceAreas.map((serviceArea) => ({
              vendorId: vendor.id,
              city: serviceArea.city,
              area: serviceArea.area,
            })),
            skipDuplicates: true,
          });
        }
      }

      await tx.user.update({
        where: { id: userId },
        data: {
          onboardingStep: 'completed',
          onboardingCompletedAt: new Date(),
        },
      });

      return tx.vendorProfile.findUnique({
        where: { userId },
        include: {
          categories: { include: { category: true } },
          packages: true,
          gallery: true,
          serviceAreas: true,
        },
      });
    });

    return updated;
  }

  private calculateProfileCompletion(source: {
    businessName?: string | null;
    slug?: string | null;
    city?: string | null;
    description?: string | null;
    phone?: string | null;
    whatsappNumber?: string | null;
    coverImage?: string | null;
    logo?: string | null;
    categoryIds?: string[];
    serviceAreas?: Array<{ city: string; area?: string }>;
  }) {
    const checkpoints = [
      source.businessName,
      source.slug,
      source.city,
      source.description,
      source.phone,
      source.whatsappNumber,
      source.coverImage,
      source.logo,
      source.categoryIds?.length,
      source.serviceAreas?.length,
    ];

    const completed = checkpoints.filter(Boolean).length;
    return Math.round((completed / checkpoints.length) * 100);
  }
}

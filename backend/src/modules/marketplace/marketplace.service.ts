import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, VendorProfile } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { MarketplaceSort, SearchVendorsDto } from './dto/search-vendors.dto';

const PUBLIC_VENDOR_INCLUDE = {
  categories: {
    include: {
      category: true,
    },
  },
  packages: {
    where: { isActive: true },
    orderBy: [{ price: 'asc' }, { sortOrder: 'asc' }],
  },
  gallery: {
    orderBy: { sortOrder: 'asc' },
    take: 12,
  },
  reviews: {
    where: { isApproved: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      client: {
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  },
  serviceAreas: true,
} satisfies Prisma.VendorProfileInclude;

type PublicVendorRecord = Prisma.VendorProfileGetPayload<{
  include: typeof PUBLIC_VENDOR_INCLUDE;
}>;

type PublicVendorListItem = ReturnType<MarketplaceService['mapVendorCard']>;

@Injectable()
export class MarketplaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getVendors(query: SearchVendorsDto) {
    const vendors = await this.prisma.vendorProfile.findMany({
      where: this.buildWhereClause(query),
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        packages: {
          where: { isActive: true },
          orderBy: [{ price: 'asc' }, { sortOrder: 'asc' }],
        },
        _count: {
          select: {
            reviews: {
              where: { isApproved: true },
            },
          },
        },
      },
    });

    const cards = vendors.map((vendor) => this.mapVendorCard(vendor));
    const sorted = this.sortVendors(cards, query.sort);
    const total = sorted.length;
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: sorted.slice(start, end),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async getFeaturedVendors(limit = 6) {
    const vendors = await this.prisma.vendorProfile.findMany({
      where: {
        ...this.baseWhereClause(),
        isFeatured: true,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        packages: {
          where: { isActive: true },
          orderBy: [{ price: 'asc' }, { sortOrder: 'asc' }],
        },
        _count: {
          select: {
            reviews: {
              where: { isApproved: true },
            },
          },
        },
      },
      orderBy: [{ avgRating: 'desc' }, { totalReviews: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    });

    return vendors.map((vendor) => this.mapVendorCard(vendor));
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
        vendors: {
          where: {
            vendor: this.baseWhereClause(),
          },
        },
      },
    });

    return categories.map((category) => ({
      id: category.id,
      slug: category.slug,
      label: category.name,
      icon: category.icon,
      count: category.vendors.length,
    }));
  }

  async getCities() {
    const grouped = await this.prisma.vendorProfile.groupBy({
      by: ['city'],
      where: this.baseWhereClause(),
      _count: {
        city: true,
      },
      orderBy: {
        _count: {
          city: 'desc',
        },
      },
    });

    return grouped.map((item) => ({
      city: item.city,
      count: item._count.city,
    }));
  }

  async getVendorBySlug(slug: string) {
    const vendor = await this.prisma.vendorProfile.findFirst({
      where: {
        slug,
        ...this.baseWhereClause(),
      },
      include: PUBLIC_VENDOR_INCLUDE,
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return this.mapPublicVendor(vendor);
  }

  async getRelatedVendors(slug: string) {
    const vendor = await this.prisma.vendorProfile.findFirst({
      where: {
        slug,
        ...this.baseWhereClause(),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const categoryIds = vendor.categories.map((item) => item.categoryId);

    const related = await this.prisma.vendorProfile.findMany({
      where: {
        ...this.baseWhereClause(),
        id: { not: vendor.id },
        city: vendor.city,
        categories: {
          some: {
            categoryId: { in: categoryIds },
          },
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        packages: {
          where: { isActive: true },
          orderBy: [{ price: 'asc' }, { sortOrder: 'asc' }],
        },
        _count: {
          select: {
            reviews: {
              where: { isApproved: true },
            },
          },
        },
      },
      orderBy: [{ avgRating: 'desc' }, { totalReviews: 'desc' }],
      take: 4,
    });

    return related.map((item) => this.mapVendorCard(item));
  }

  async incrementProfileView(slug: string) {
    const vendor = await this.prisma.vendorProfile.findFirst({
      where: {
        slug,
        ...this.baseWhereClause(),
      },
      select: { id: true },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    await this.prisma.vendorProfile.update({
      where: { id: vendor.id },
      data: {
        profileViews: { increment: 1 },
      },
    });

    return { acknowledged: true };
  }

  private baseWhereClause(): Prisma.VendorProfileWhereInput {
    return {
      status: 'APPROVED',
      isPublic: true,
    };
  }

  private buildWhereClause(query: SearchVendorsDto): Prisma.VendorProfileWhereInput {
    const search = query.search?.trim();

    return {
      ...this.baseWhereClause(),
      city: query.city
        ? {
            equals: query.city,
            mode: 'insensitive',
          }
        : undefined,
      avgRating: query.rating
        ? {
            gte: query.rating,
          }
        : undefined,
      categories: query.category
        ? {
            some: {
              category: {
                OR: [
                  { slug: query.category.toLowerCase() },
                  { name: { equals: query.category, mode: 'insensitive' } },
                ],
              },
            },
          }
        : undefined,
      packages:
        query.minPrice || query.maxPrice
          ? {
              some: {
                isActive: true,
                price: {
                  gte: query.minPrice,
                  lte: query.maxPrice,
                },
              },
            }
          : {
              some: { isActive: true },
            },
      OR: search
        ? [
            { businessName: { contains: search, mode: 'insensitive' } },
            { tagline: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        : undefined,
    };
  }

  private mapVendorCard(
    vendor: VendorProfile & {
      categories?: Array<{ category?: { name: string; slug: string } | null }>;
      packages?: Array<{ price: number; discountPrice: number | null }>;
      _count?: { reviews?: number };
    },
  ) {
    const primaryCategory = vendor.categories?.[0]?.category;
    const activePackages = vendor.packages ?? [];
    const startingPrice =
      activePackages.length > 0
        ? Math.min(
            ...activePackages.map((item) => item.discountPrice ?? item.price),
          )
        : 0;

    return {
      id: vendor.id,
      slug: vendor.slug,
      businessName: vendor.businessName,
      city: vendor.city,
      tagline: vendor.tagline,
      description: vendor.description,
      coverImage: vendor.coverImage,
      logo: vendor.logo,
      isFeatured: vendor.isFeatured,
      isVerified: vendor.isVerified,
      avgRating: vendor.avgRating,
      totalReviews: vendor.totalReviews || vendor._count?.reviews || 0,
      profileViews: vendor.profileViews,
      createdAt: vendor.createdAt,
      category: primaryCategory
        ? {
            name: primaryCategory.name,
            slug: primaryCategory.slug,
          }
        : null,
      categories:
        vendor.categories?.map((item) => ({
          name: item.category?.name ?? '',
          slug: item.category?.slug ?? '',
        })) ?? [],
      startingPrice,
    };
  }

  private mapPublicVendor(vendor: PublicVendorRecord) {
    const base = this.mapVendorCard(vendor);

    return {
      ...base,
      address: vendor.address,
      phone: vendor.phone,
      whatsappNumber: null,
      instagramUrl: vendor.instagramUrl,
      facebookUrl: vendor.facebookUrl,
      websiteUrl: vendor.websiteUrl,
      serviceAreas: vendor.serviceAreas,
      packages: vendor.packages.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        discountPrice: item.discountPrice,
        duration: item.duration,
        includedServices: item.includedServices,
      })),
      gallery: vendor.gallery,
      reviews: vendor.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        reply: review.reply,
        createdAt: review.createdAt,
        client: {
          name: review.client.user?.name ?? 'Client',
          avatar: review.client.user?.avatar ?? null,
        },
      })),
    };
  }

  private sortVendors(vendors: PublicVendorListItem[], sort?: MarketplaceSort) {
    const sorted = [...vendors];

    switch (sort) {
      case 'price_asc':
        sorted.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case 'newest':
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case 'rating':
      default:
        sorted.sort((a, b) => {
          if (b.avgRating === a.avgRating) {
            return b.totalReviews - a.totalReviews;
          }

          return b.avgRating - a.avgRating;
        });
        break;
    }

    return sorted;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

const DEFAULT_CATEGORIES = [
  { name: 'Bridal Salon', slug: 'bridal-salon', description: 'Full-service bridal salons' },
  { name: 'Makeup Artist', slug: 'makeup-artist', description: 'Bridal and party makeup specialists' },
  { name: 'Photographer', slug: 'photographer', description: 'Wedding and event photography experts' },
  { name: 'Decorator', slug: 'decorator', description: 'Decor vendors for wedding stages and venues' },
];

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    await Promise.all(
      DEFAULT_CATEGORIES.map((category, index) =>
        this.prisma.category.upsert({
          where: { slug: category.slug },
          create: { ...category, sortOrder: index },
          update: { description: category.description, sortOrder: index },
        }),
      ),
    );

    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
}

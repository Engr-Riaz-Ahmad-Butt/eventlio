import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Makeup Artist', slug: 'makeup-artist', icon: 'Brush', sortOrder: 1 },
    { name: 'Photographer', slug: 'photographer', icon: 'Camera', sortOrder: 2 },
    { name: 'Videographer', slug: 'videographer', icon: 'Video', sortOrder: 3 },
    { name: 'Caterer', slug: 'caterer', icon: 'Utensils', sortOrder: 4 },
    { name: 'Decorator', slug: 'decorator', icon: 'Palette', sortOrder: 5 },
    { name: 'Venue', slug: 'venue', icon: 'Home', sortOrder: 6 },
    { name: 'DJ', slug: 'dj', icon: 'Music', sortOrder: 7 },
    { name: 'Wedding Planner', slug: 'wedding-planner', icon: 'Calendar', sortOrder: 8 },
  ];

  console.log('Seeding categories...');

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient, Role, VendorStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Bridal Makeup', slug: 'bridal-makeup', icon: 'Brush', sortOrder: 1 },
    { name: 'Photographer', slug: 'photographer', icon: 'Camera', sortOrder: 2 },
    { name: 'Salon', slug: 'salon', icon: 'Scissors', sortOrder: 3 },
    { name: 'Decorator', slug: 'decorator', icon: 'Palette', sortOrder: 4 },
    { name: 'Caterer', slug: 'caterer', icon: 'Utensils', sortOrder: 5 },
    { name: 'DJ', slug: 'dj', icon: 'Music', sortOrder: 6 },
    { name: 'Mehndi Artist', slug: 'mehndi-artist', icon: 'Sparkles', sortOrder: 7 },
    { name: 'Venue', slug: 'venue', icon: 'Home', sortOrder: 8 },
  ];

  const sampleVendors = [
    ['Studio Noor Photography', 'studio-noor-photography', 'photographer', 'Rawalpindi', 4.9, true],
    ['Mahvish Bridal Makeup', 'mahvish-bridal-makeup', 'bridal-makeup', 'Lahore', 4.8, true],
    ['Royal Decor Events', 'royal-decor-events', 'decorator', 'Karachi', 4.7, true],
    ['Zahra Salon & Spa', 'zahra-salon-and-spa', 'salon', 'Islamabad', 4.8, false],
    ['Beats by DJ Zain', 'beats-by-dj-zain', 'dj', 'Lahore', 4.6, false],
    ['Al-Baraka Catering', 'al-baraka-catering', 'caterer', 'Rawalpindi', 4.9, true],
    ['Noor Mehndi Studio', 'noor-mehndi-studio', 'mehndi-artist', 'Islamabad', 4.5, false],
    ['Afaq Wedding Frames', 'afaq-wedding-frames', 'photographer', 'Karachi', 4.6, false],
    ['Sahar Bridal Lounge', 'sahar-bridal-lounge', 'bridal-makeup', 'Rawalpindi', 4.7, true],
    ['Emerald Event Decor', 'emerald-event-decor', 'decorator', 'Lahore', 4.8, false],
    ['Grand Feast Caterers', 'grand-feast-caterers', 'caterer', 'Islamabad', 4.5, false],
    ['Rang-e-Hina Mehndi', 'rang-e-hina-mehndi', 'mehndi-artist', 'Lahore', 4.7, false],
  ] as const;

  console.log('Seeding categories...');

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  console.log('Seeding sample vendors...');

  for (const [businessName, slug, categorySlug, city, avgRating, isFeatured] of sampleVendors) {
    const email = `${slug}@eventlio.test`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: businessName,
        role: Role.VENDOR_OWNER,
        isEmailVerified: true,
      },
      create: {
        name: businessName,
        email,
        passwordHash: 'seed-password-hash',
        role: Role.VENDOR_OWNER,
        isEmailVerified: true,
        onboardingStep: 'completed',
        onboardingCompletedAt: new Date(),
      },
    });

    const vendor = await prisma.vendorProfile.upsert({
      where: { userId: user.id },
      update: {
        businessName,
        slug,
        city,
        tagline: `${businessName} for Mehndi, Barat, and Walima events`,
        description: `${businessName} helps Pakistani families book confidently with clear pricing and polished service delivery.`,
        status: VendorStatus.APPROVED,
        isPublic: true,
        isFeatured,
        isVerified: true,
        avgRating,
        totalReviews: Math.floor(avgRating * 30),
        profileCompletion: 100,
      },
      create: {
        userId: user.id,
        businessName,
        slug,
        city,
        tagline: `${businessName} for Mehndi, Barat, and Walima events`,
        description: `${businessName} helps Pakistani families book confidently with clear pricing and polished service delivery.`,
        phone: '+923001234567',
        whatsappNumber: '+923001234567',
        status: VendorStatus.APPROVED,
        isPublic: true,
        isFeatured,
        isVerified: true,
        avgRating,
        totalReviews: Math.floor(avgRating * 30),
        profileCompletion: 100,
      },
    });

    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (category) {
      await prisma.vendorCategory.upsert({
        where: {
          vendorId_categoryId: {
            vendorId: vendor.id,
            categoryId: category.id,
          },
        },
        update: {},
        create: {
          vendorId: vendor.id,
          categoryId: category.id,
        },
      });
    }

    await prisma.vendorPackage.deleteMany({
      where: { vendorId: vendor.id },
    });

    await prisma.vendorPackage.createMany({
      data: [
        {
          vendorId: vendor.id,
          title: 'Basic',
          description: 'Starter package for smaller events',
          price: 15000,
          sortOrder: 1,
        },
        {
          vendorId: vendor.id,
          title: 'Standard',
          description: 'Balanced package for most bookings',
          price: 35000,
          sortOrder: 2,
        },
        {
          vendorId: vendor.id,
          title: 'Premium',
          description: 'Best fit for full event coverage',
          price: 65000,
          sortOrder: 3,
        },
      ],
    });

    await prisma.serviceArea.upsert({
      where: {
        vendorId_city: {
          vendorId: vendor.id,
          city,
        },
      },
      update: {},
      create: {
        vendorId: vendor.id,
        city,
      },
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

export type MarketplaceVendor = {
  id: string;
  slug: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  badge: string;
  gradient: string;
  responseTime: string;
  eventsDone: number;
  tagline: string;
  description: string;
  about: string;
  packages: Array<{
    name: string;
    price: number;
    summary: string;
  }>;
  gallery: string[];
};

export const marketplaceCities = [
  "All Cities",
  "Rawalpindi",
  "Islamabad",
  "Lahore",
  "Karachi",
  "Faisalabad",
];

export const marketplaceCategories = [
  "Photographer",
  "Bridal Makeup",
  "Salon",
  "Decorator",
  "Caterer",
  "DJ",
  "Mehndi Artist",
];

export const quickFilters = [
  "4+ Rating",
  "Under 20K",
  "New",
  "Verified",
];

export const eventTypes = [
  "Mehndi",
  "Barat",
  "Walima",
  "Engagement",
  "Birthday",
  "Corporate",
];

export const mockVendors: MarketplaceVendor[] = [
  {
    id: "1",
    slug: "studio-noor-photography",
    name: "Studio Noor Photography",
    category: "Photographer",
    city: "Rawalpindi",
    rating: 4.9,
    reviews: 127,
    startingPrice: 45000,
    badge: "Top Rated",
    gradient: "from-emerald-900 to-emerald-700",
    responseTime: "within 30 mins",
    eventsDone: 180,
    tagline: "Luxury wedding stories, shot with calm precision.",
    description:
      "Barat, Walima, and destination coverage with same-day teaser edits and soft cinematic framing.",
    about:
      "Studio Noor works with couples who want polished storytelling without the stress. From bridal prep to final rukhsati, every frame is planned around light, timing, and emotional flow.",
    packages: [
      { name: "Basic", price: 45000, summary: "1 event day, highlight reel, 150 edits" },
      { name: "Standard", price: 65000, summary: "2 event days, teaser, album support" },
      { name: "Premium", price: 90000, summary: "3 event days, reels, cinematic edits" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "2",
    slug: "mahvish-bridal-makeup",
    name: "Mahvish Bridal Makeup",
    category: "Bridal Makeup",
    city: "Lahore",
    rating: 4.8,
    reviews: 89,
    startingPrice: 18000,
    badge: "Most Booked",
    gradient: "from-amber-900 to-amber-700",
    responseTime: "within 45 mins",
    eventsDone: 220,
    tagline: "Soft glam bridal looks with skin-first prep.",
    description:
      "Bridal, engagement, and walima looks designed for camera, stage light, and long event hours.",
    about:
      "Mahvish specializes in graceful, long-wear bridal artistry with elegant finishing and detailed skin prep. Clients choose her for refined looks that still feel personal.",
    packages: [
      { name: "Basic", price: 18000, summary: "Single look, lashes, dupatta setting" },
      { name: "Standard", price: 25000, summary: "Premium products, touch-up assistant" },
      { name: "Premium", price: 38000, summary: "Luxury bridal coverage with mother touch-up" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "3",
    slug: "royal-decor-events",
    name: "Royal Decor Events",
    category: "Decorator",
    city: "Karachi",
    rating: 4.7,
    reviews: 56,
    startingPrice: 80000,
    badge: "Featured",
    gradient: "from-teal-900 to-teal-700",
    responseTime: "within 1 hour",
    eventsDone: 130,
    tagline: "Stage, florals, and luxe event styling under one team.",
    description:
      "Large-scale decor concepts for mehndi, barat, and walima with floral styling and lighting support.",
    about:
      "Royal Decor handles full event styling with a strong execution team and practical planning. The result is visually rich decor that still runs on time and on budget.",
    packages: [
      { name: "Basic", price: 80000, summary: "Stage decor with floral accents" },
      { name: "Standard", price: 125000, summary: "Entrance, stage, tables, ambient lighting" },
      { name: "Premium", price: 180000, summary: "Full event transformation with theme styling" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "4",
    slug: "zahra-salon-and-spa",
    name: "Zahra Salon & Spa",
    category: "Salon",
    city: "Islamabad",
    rating: 4.8,
    reviews: 203,
    startingPrice: 8000,
    badge: "Verified",
    gradient: "from-green-900 to-emerald-700",
    responseTime: "within 20 mins",
    eventsDone: 320,
    tagline: "Salon packages for brides, mothers, and event guests.",
    description:
      "Bridal prep, party makeup, hair styling, and grooming packages with a polished in-salon experience.",
    about:
      "Zahra Salon blends premium bridal service with practical family packages, making it a strong choice for event weeks with multiple appointments and coordinated looks.",
    packages: [
      { name: "Basic", price: 8000, summary: "Guest glam with hair styling" },
      { name: "Standard", price: 14000, summary: "Engagement or walima glam package" },
      { name: "Premium", price: 26000, summary: "Bridal prep with layered service flow" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "5",
    slug: "beats-by-dj-zain",
    name: "Beats by DJ Zain",
    category: "DJ",
    city: "Lahore",
    rating: 4.6,
    reviews: 44,
    startingPrice: 30000,
    badge: "New",
    gradient: "from-lime-900 to-emerald-700",
    responseTime: "within 2 hours",
    eventsDone: 64,
    tagline: "High-energy mehndi sets and curated walima sound.",
    description:
      "DJ, sound setup, and event cue coordination for mehndi nights, corporate evenings, and reception shows.",
    about:
      "DJ Zain mixes crowd-read energy with dependable logistics. Clients book him when they need clean execution, tight cueing, and a confident host-energy setup.",
    packages: [
      { name: "Basic", price: 30000, summary: "DJ set with compact sound setup" },
      { name: "Standard", price: 50000, summary: "Expanded sound, emcee support, cue list" },
      { name: "Premium", price: 78000, summary: "Full event control with lighting sync" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "6",
    slug: "al-baraka-catering",
    name: "Al-Baraka Catering",
    category: "Caterer",
    city: "Rawalpindi",
    rating: 4.9,
    reviews: 178,
    startingPrice: 120000,
    badge: "Top Rated",
    gradient: "from-stone-900 to-amber-700",
    responseTime: "within 1 hour",
    eventsDone: 245,
    tagline: "Large-family catering with premium service ops.",
    description:
      "Trusted for barat and walima service with buffet planning, service staff, and event-day coordination.",
    about:
      "Al-Baraka is known for operational discipline: reliable serving teams, clear package structures, and menu flexibility for families planning large gatherings.",
    packages: [
      { name: "Basic", price: 120000, summary: "100 guest buffet setup" },
      { name: "Standard", price: 180000, summary: "150 guest buffet with dessert station" },
      { name: "Premium", price: 260000, summary: "Full-service luxury wedding catering" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

export const mockBookings = [
  {
    id: "b1",
    client: "Sarah Ahmed",
    event: "Barat",
    date: "15 Jun 2026",
    package: "Premium Photography",
    amount: 65000,
    advance: 20000,
    status: "confirmed",
    city: "Rawalpindi",
  },
  {
    id: "b2",
    client: "Ali Hassan",
    event: "Mehndi",
    date: "18 Jun 2026",
    package: "Standard Decor",
    amount: 30000,
    advance: 10000,
    status: "pending",
    city: "Islamabad",
  },
  {
    id: "b3",
    client: "Fatima Khan",
    event: "Walima",
    date: "22 Jun 2026",
    package: "Basic Makeup",
    amount: 20000,
    advance: 5000,
    status: "completed",
    city: "Lahore",
  },
  {
    id: "b4",
    client: "Omar Malik",
    event: "Birthday",
    date: "01 Jul 2026",
    package: "Premium DJ",
    amount: 50000,
    advance: 15000,
    status: "pending",
    city: "Karachi",
  },
];

export const mockPayments = [
  {
    id: "p1",
    client: "Sarah Ahmed",
    event: "Barat",
    amount: 20000,
    type: "Advance",
    status: "Received",
    date: "10 May 2026",
  },
  {
    id: "p2",
    client: "Ali Hassan",
    event: "Mehndi",
    amount: 10000,
    type: "Advance",
    status: "Pending",
    date: "12 May 2026",
  },
  {
    id: "p3",
    client: "Fatima Khan",
    event: "Walima",
    amount: 15000,
    type: "Remaining",
    status: "Partial",
    date: "14 May 2026",
  },
];

export const mockStats = {
  todayBookings: 12,
  monthlyRevenue: 245000,
  pendingPayments: 85000,
  totalClients: 47,
};

export const marketTestimonials = [
  {
    name: "Ahmed Raza",
    role: "Photographer, Rawalpindi",
    quote:
      "Pehle main WhatsApp pe booking track karta tha. Ab Eventlio pe advance, dates, aur clients sab ek jagah clear dikhte hain.",
  },
  {
    name: "Sana Fatima",
    role: "Bridal Makeup Artist, Lahore",
    quote:
      "Season ke time pe kis client ne confirm kiya, kis ne nahi, sab confuse hota tha. Eventlio ne poora system easy kar diya.",
  },
  {
    name: "Hassan Ali",
    role: "Salon Owner, Karachi",
    quote:
      "Hamari team bookings aur payments dono ko better handle kar rahi hai. Aur naye leads bhi platform se mil rahe hain.",
  },
];

export function getVendorBySlug(slug: string) {
  return mockVendors.find((vendor) => vendor.slug === slug);
}

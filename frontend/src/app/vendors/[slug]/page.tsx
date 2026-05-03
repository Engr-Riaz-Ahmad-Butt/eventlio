import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import { getVendorBySlug } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  return (
    <main className="market-shell min-h-screen pb-24">
      <section className={`relative h-[340px] bg-gradient-to-br ${vendor.gradient}`}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,23,0.1),rgba(10,31,23,0.72))]" />
        <div className="section-shell relative flex h-full items-end pb-12 text-white">
          <div className="max-w-4xl">
            <Badge variant="gold">{vendor.badge}</Badge>
            <h1 className="display-h1 mt-5 text-white">{vendor.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="rounded-full border border-white/15 px-3 py-1">{vendor.category}</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {vendor.city}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                {vendor.rating} ({vendor.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-shell -mt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-md)] sm:p-8">
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="rounded-[22px] bg-[var(--warm-white)] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--gray-text)]">Rating</p>
                  <p className="mt-3 font-mono-ui text-2xl text-[var(--dark)]">{vendor.rating}</p>
                </div>
                <div className="rounded-[22px] bg-[var(--warm-white)] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--gray-text)]">Reviews</p>
                  <p className="mt-3 font-mono-ui text-2xl text-[var(--dark)]">{vendor.reviews}</p>
                </div>
                <div className="rounded-[22px] bg-[var(--warm-white)] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--gray-text)]">Response</p>
                  <p className="mt-3 text-sm font-semibold text-[var(--dark)]">{vendor.responseTime}</p>
                </div>
                <div className="rounded-[22px] bg-[var(--warm-white)] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--gray-text)]">Events Done</p>
                  <p className="mt-3 font-mono-ui text-2xl text-[var(--dark)]">{vendor.eventsDone}+</p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <h2 className="font-heading text-3xl text-[var(--dark)]">Packages</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {vendor.packages.map((pkg) => (
                  <article
                    key={pkg.name}
                    className="rounded-[24px] border border-[color:rgba(27,77,62,0.08)] bg-[var(--warm-white)] p-5"
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold-dark)]">{pkg.name}</p>
                    <p className="mt-3 font-mono-ui text-2xl text-[var(--dark)]">
                      PKR {pkg.price.toLocaleString()}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--gray-text)]">{pkg.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <h2 className="font-heading text-3xl text-[var(--dark)]">Gallery</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {vendor.gallery.map((image, index) => (
                  <img
                    key={`${vendor.id}-${index}`}
                    src={image}
                    alt={`${vendor.name} gallery ${index + 1}`}
                    className="h-64 w-full rounded-[22px] object-cover"
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <h2 className="font-heading text-3xl text-[var(--dark)]">About</h2>
              <p className="mt-5 leading-8 text-[var(--gray-text)]">{vendor.about}</p>
            </section>

            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <h2 className="font-heading text-3xl text-[var(--dark)]">Reviews</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Highly professional team and very calm on the event day.",
                  "Packages were clear and response was fast on WhatsApp.",
                  "Good coordination and visuals stayed premium throughout the event.",
                ].map((review) => (
                  <div
                    key={review}
                    className="rounded-[22px] border border-[color:rgba(27,77,62,0.08)] bg-[var(--warm-white)] p-5"
                  >
                    <div className="font-mono-ui text-[var(--gold-dark)]">★★★★★</div>
                    <p className="mt-3 leading-7 text-[var(--gray-text)]">{review}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-md)] lg:sticky lg:top-24">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">Starting from</p>
            <p className="mt-3 font-mono-ui text-3xl text-[var(--gold-dark)]">
              PKR {vendor.startingPrice.toLocaleString()}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--gray-text)]">{vendor.tagline}</p>

            <div className="mt-6 space-y-3 text-sm text-[var(--gray-text)]">
              <p className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[var(--primary)]" />
                Response time: {vendor.responseTime}
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--primary)]" />
                Contact details unlocked after booking confirmation
              </p>
            </div>

            <Button variant="gold" size="xl" className="mt-8 w-full">
              Booking Request Bhejo →
            </Button>
            <Button variant="outline" size="xl" className="mt-3 w-full" asChild>
              <Link href="/vendors">Back to Vendors</Link>
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
}

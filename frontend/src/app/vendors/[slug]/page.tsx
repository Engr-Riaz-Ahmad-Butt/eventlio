"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import type { VendorProfile } from "@/types";
import { ExternalLink, Loader2, MapPin, Phone } from "lucide-react";

export default function PublicVendorProfilePage() {
  const params = useParams<{ slug: string }>();
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadVendor() {
      setIsLoading(true);
      try {
        const response = await api.get(`/vendor-profiles/${params.slug}`);
        setVendor(response.data.data);
      } finally {
        setIsLoading(false);
      }
    }
    void loadVendor();
  }, [params.slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
      </main>
    );
  }

  if (!vendor) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-3xl glass rounded-[2rem] p-8">
          <h1 className="text-3xl font-black">Vendor not found</h1>
          <p className="mt-3 text-sm text-foreground/70">This public vendor profile is unavailable right now.</p>
          <Link href="/" className="mt-6 inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="glass overflow-hidden rounded-[2rem]">
          {vendor.coverImage ? (
            <img src={vendor.coverImage} alt={vendor.businessName} className="h-64 w-full object-cover sm:h-80" />
          ) : (
            <div className="h-64 w-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 sm:h-80" />
          )}
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex items-center gap-4">
                {vendor.logo ? (
                  <img src={vendor.logo} alt={`${vendor.businessName} logo`} className="h-20 w-20 rounded-2xl object-cover ring-4 ring-black/20" />
                ) : null}
                <div>
                  <h1 className="text-3xl font-black">{vendor.businessName}</h1>
                  <p className="mt-1 text-sm text-violet-200">{vendor.tagline || vendor.city}</p>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-sm leading-7 text-foreground/75">
                {vendor.description || "This vendor has not added a public business description yet."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {vendor.categories?.map((item) => (
                  <span key={item.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                    {item.category?.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <h2 className="text-lg font-bold">Contact details</h2>
              <div className="mt-4 space-y-3 text-sm text-foreground/75">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-violet-300" />
                  {vendor.city}
                </p>
                {vendor.phone ? (
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-violet-300" />
                    {vendor.phone}
                  </p>
                ) : null}
                {vendor.instagramUrl ? (
                  <a href={vendor.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-violet-300 hover:text-violet-200">
                    <ExternalLink className="h-4 w-4" />
                    Instagram
                  </a>
                ) : null}
                {vendor.facebookUrl ? (
                  <a href={vendor.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-violet-300 hover:text-violet-200">
                    <ExternalLink className="h-4 w-4" />
                    Facebook
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Portfolio gallery</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {vendor.gallery?.length ? vendor.gallery.map((item) => (
                <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
                  <img src={item.url} alt={item.caption || vendor.businessName} className="h-56 w-full rounded-xl object-cover" />
                  <p className="mt-3 text-sm text-foreground/75">{item.caption || "Eventlio portfolio item"}</p>
                </div>
              )) : (
                <p className="text-sm text-foreground/60">Gallery items will appear here once the vendor uploads them.</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <section className="glass rounded-[2rem] p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Packages and pricing</h2>
              <div className="mt-6 space-y-4">
                {vendor.packages?.length ? vendor.packages.map((item) => (
                  <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-bold">{item.title}</p>
                        <p className="mt-2 text-sm text-foreground/70">{item.description}</p>
                        {item.includedServices?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.includedServices.map((service) => (
                              <span key={service} className="rounded-full border border-white/10 px-3 py-1 text-xs">
                                {service}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black">PKR {item.price.toLocaleString()}</p>
                        {item.duration ? <p className="text-xs text-foreground/55">{item.duration}</p> : null}
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-foreground/60">Packages will appear here after the vendor adds them.</p>
                )}
              </div>
            </section>

            <section className="glass rounded-[2rem] p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Service areas</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {vendor.serviceAreas?.length ? vendor.serviceAreas.map((area) => (
                  <span key={area.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                    {area.city}{area.area ? `, ${area.area}` : ""}
                  </span>
                )) : (
                  <p className="text-sm text-foreground/60">No service areas added yet.</p>
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

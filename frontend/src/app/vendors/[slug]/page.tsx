"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { 
  MapPin, 
  Star, 
  Instagram, 
  Facebook, 
  Globe, 
  Phone, 
  MessageSquare,
  Calendar,
  CheckCircle2,
  Share2,
  Heart,
  Loader2,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PublicVendorProfilePage() {
  const { slug } = useParams();
  const [vendor, setVendor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVendor() {
      try {
        const res = await api.get(`/vendor-profiles/${slug}`);
        setVendor(res.data.data);
      } catch (err) {
        toast.error("Vendor not found");
      } finally {
        setIsLoading(false);
      }
    }
    fetchVendor();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!vendor) return null;

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      {/* Cover Image */}
      <div className="h-[40vh] relative overflow-hidden">
        <img 
          src={vendor.coverImage || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"} 
          className="w-full h-full object-cover"
          alt={vendor.businessName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Business Info Card */}
            <div className="glass-strong p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-1 flex-shrink-0">
                <img 
                  src={vendor.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.businessName)}&background=random`} 
                  className="w-full h-full object-cover rounded-xl"
                  alt="Logo"
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-extrabold tracking-tight">{vendor.businessName}</h1>
                  {vendor.isFeatured && (
                    <span className="bg-violet-500/20 text-violet-400 text-xs font-bold px-3 py-1 rounded-full border border-violet-500/20">
                      FEATURED
                    </span>
                  )}
                </div>
                
                <p className="text-xl text-foreground/60 font-medium italic">"{vendor.tagline || 'Professional Event Services'}"</p>
                
                <div className="flex flex-wrap items-center gap-6 text-foreground/50">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-violet-400" />
                    <span>{vendor.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-white font-bold">4.8</span>
                    <span>(24 Reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Responds in 1h</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {vendor.instagramUrl && (
                    <a href={vendor.instagramUrl} target="_blank" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <Instagram className="w-5 h-5 text-pink-500" />
                    </a>
                  )}
                  {vendor.facebookUrl && (
                    <a href={vendor.facebookUrl} target="_blank" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <Facebook className="w-5 h-5 text-blue-500" />
                    </a>
                  )}
                  {vendor.websiteUrl && (
                    <a href={vendor.websiteUrl} target="_blank" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <Globe className="w-5 h-5 text-emerald-500" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">About Us</h3>
              <div className="glass-strong p-8 rounded-3xl border border-white/5 leading-relaxed text-foreground/70">
                {vendor.description || "No description available for this vendor."}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Portfolio & Gallery</h3>
                <span className="text-foreground/40 text-sm font-medium">{vendor.gallery?.length || 0} Photos</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vendor.gallery?.map((item: any, i: number) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden group relative">
                    <img src={item.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Packages & Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vendor.packages?.map((pkg: any) => (
                  <div key={pkg.id} className="glass-strong p-8 rounded-3xl border border-white/5 space-y-6 hover:border-violet-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-bold">{pkg.title}</h4>
                      <div className="text-right">
                        <p className="text-2xl font-extrabold text-violet-400">Rs. {pkg.price.toLocaleString()}</p>
                        {pkg.duration && <p className="text-xs text-foreground/40 mt-1">{pkg.duration}</p>}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60">{pkg.description}</p>
                    <ul className="space-y-3">
                      {pkg.includedServices?.map((service: string, j: number) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-white/5 hover:bg-violet-500 hover:text-white border border-white/10 rounded-xl py-6 font-bold transition-all">
                      Inquire Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Booking Card */}
          <div className="space-y-8">
            <div className="glass-strong p-8 rounded-3xl border border-white/5 sticky top-24 space-y-6 shadow-2xl shadow-violet-900/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-foreground/40 font-medium">Starting from</p>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                    <Share2 className="w-5 h-5 text-foreground/40" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                    <Heart className="w-5 h-5 text-foreground/40" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">Rs. 25k</span>
                <span className="text-foreground/40 text-sm">/ event</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <Calendar className="w-6 h-6 text-violet-400" />
                  <div>
                    <p className="text-xs font-bold text-foreground/30 uppercase tracking-wider">Availability</p>
                    <p className="text-sm font-medium">Next available: Nov 12</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-xs font-bold text-foreground/30 uppercase tracking-wider">Service Areas</p>
                    <p className="text-sm font-medium">{vendor.serviceAreas?.map((a: any) => a.city).join(", ") || vendor.city}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white h-14 rounded-2xl font-bold text-lg shadow-xl shadow-violet-900/30 group">
                  Book Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="w-full bg-transparent border-white/10 hover:bg-white/5 text-white h-14 rounded-2xl font-bold">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>

              <p className="text-[10px] text-center text-foreground/30 px-6">
                By clicking "Book Now", you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            {/* Quick Contact Info */}
            <div className="glass-strong p-8 rounded-3xl border border-white/5 space-y-4">
              <h4 className="font-bold">Contact Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-foreground/60">
                  <Phone className="w-4 h-4 text-violet-400" />
                  <span>{vendor.phone || "+92 3XX XXXXXXX"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/60">
                  <Globe className="w-4 h-4 text-violet-400" />
                  <span>{vendor.websiteUrl?.replace("https://", "") || "No website link"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for bottom */}
      <div className="h-20" />
    </div>
  );
}

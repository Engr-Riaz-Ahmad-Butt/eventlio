"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  ArrowRight,
  Loader2,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function VendorDirectoryPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [vendorsRes, catsRes] = await Promise.all([
          api.get("/vendor-profiles", {
            params: { search, category: selectedCategory, city: selectedCity }
          }),
          api.get("/categories")
        ]);
        setVendors(vendorsRes.data.data || []);
        setCategories(catsRes.data.data || []);
      } catch (err) {
        console.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [search, selectedCategory, selectedCity]);

  return (
    <div className="min-h-screen bg-[#030014] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Discover Exceptional <span className="text-gradient">Event Vendors</span>
          </h1>
          <p className="text-foreground/50 max-w-2xl mx-auto">
            Find and book the best photographers, makeup artists, and planners for your next big event.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-strong p-4 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-4 shadow-2xl shadow-violet-900/10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
            <Input 
              placeholder="Search by business name or services..." 
              className="pl-12 bg-white/5 border-white/10 h-14 rounded-2xl focus:border-violet-500/50 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select 
              className="bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-sm font-medium focus:outline-none focus:border-violet-500/50 appearance-none min-w-[160px]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>

            <select 
              className="bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-sm font-medium focus:outline-none focus:border-violet-500/50 appearance-none min-w-[140px]"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Islamabad">Islamabad</option>
            </select>

            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 h-14 rounded-2xl font-bold">
              Find Vendors
            </Button>
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-violet-500" />
            <p className="text-foreground/40 font-medium">Finding the best vendors for you...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((vendor) => (
              <Link 
                key={vendor.id} 
                href={`/vendors/${vendor.slug}`}
                className="group glass-strong rounded-3xl border border-white/5 overflow-hidden hover:border-violet-500/30 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Wrap */}
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={vendor.coverImage || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={vendor.businessName}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#030014]/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest">
                      {vendor.categories?.[0]?.category?.name || "Service"}
                    </span>
                  </div>
                  {vendor.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-violet-500 text-white p-2 rounded-full shadow-lg">
                        <Star className="w-4 h-4 fill-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold group-hover:text-violet-400 transition-colors">{vendor.businessName}</h3>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-sm font-bold text-white">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground/50 line-clamp-2 leading-relaxed">
                    {vendor.description || "Discover premium event services provided by our verified experts."}
                  </p>

                  <div className="pt-2 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-foreground/40">
                      <MapPin className="w-4 h-4 text-violet-500" />
                      {vendor.city}
                    </div>
                    <div className="flex items-center gap-1 font-bold text-sm">
                      <span className="text-foreground/40 font-medium">from</span>
                      <span className="text-white">Rs. 25,000</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && vendors.length === 0 && (
          <div className="text-center py-20 space-y-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-foreground/20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">No vendors found</h3>
              <p className="text-foreground/40">Try adjusting your filters or search terms.</p>
            </div>
            <Button 
              onClick={() => {
                setSearch("");
                setSelectedCategory("");
                setSelectedCity("");
              }}
              variant="outline" 
              className="rounded-xl border-white/10 text-foreground/60"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

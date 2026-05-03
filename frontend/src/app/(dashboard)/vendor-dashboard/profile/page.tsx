"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Store, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Globe, 
  Save, 
  Loader2,
  Camera,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

const profileSchema = z.object({
  businessName: z.string().min(3, "Business name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  tagline: z.string().optional(),
  city: z.string().min(2, "City is required"),
  address: z.string().optional(),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  instagramUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  facebookUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  websiteUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
});

export default function VendorProfilePage() {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/vendor-profiles/me/profile");
        const profile = res.data.data;
        reset({
          businessName: profile.businessName || "",
          description: profile.description || "",
          tagline: profile.tagline || "",
          city: profile.city || "",
          address: profile.address || "",
          phone: profile.phone || "",
          whatsappNumber: profile.whatsappNumber || "",
          instagramUrl: profile.instagramUrl || "",
          facebookUrl: profile.facebookUrl || "",
          websiteUrl: profile.websiteUrl || "",
        });
      } catch (err) {
        toast.error("Failed to fetch profile details");
      } finally {
        setIsFetching(false);
      }
    }
    fetchProfile();
  }, [reset]);

  async function onSubmit(data: any) {
    setIsLoading(true);
    try {
      const res = await api.patch("/vendor-profiles/me/profile", data);
      
      // Update local store user object
      if (user) {
        setUser({
          ...user,
          vendorProfile: res.data.data
        });
      }
      
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Business Profile</h1>
          <p className="text-foreground/50">Manage your public presence and contact information.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info Section */}
        <div className="glass-strong rounded-3xl border border-white/5 p-8 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Store className="w-5 h-5 text-violet-400" />
            <h3 className="font-bold text-lg">Basic Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                className="bg-white/5 border-white/10 rounded-xl h-11"
                {...register("businessName")}
              />
              {errors.businessName && <p className="text-xs text-red-400">{errors.businessName.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                placeholder="e.g. Capturing your best moments"
                className="bg-white/5 border-white/10 rounded-xl h-11"
                {...register("tagline")}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">About Business</Label>
              <Textarea
                id="description"
                placeholder="Describe what makes your service unique..."
                className="bg-white/5 border-white/10 rounded-xl min-h-[120px]"
                {...register("description")}
              />
              {errors.description && <p className="text-xs text-red-400">{errors.description.message as string}</p>}
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="glass-strong rounded-3xl border border-white/5 p-8 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-lg">Location & Contact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                className="bg-white/5 border-white/10 rounded-xl h-11"
                {...register("city")}
              />
              {errors.city && <p className="text-xs text-red-400">{errors.city.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Business Phone</Label>
              <Input
                id="phone"
                className="bg-white/5 border-white/10 rounded-xl h-11"
                {...register("phone")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                className="bg-white/5 border-white/10 rounded-xl h-11"
                {...register("whatsappNumber")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Input
                id="address"
                className="bg-white/5 border-white/10 rounded-xl h-11"
                {...register("address")}
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-strong rounded-3xl border border-white/5 p-8 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg">Social Presence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <div className="relative">
                <Instagram className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="instagramUrl"
                  placeholder="https://instagram.com/..."
                  className="pl-10 bg-white/5 border-white/10 rounded-xl h-11"
                  {...register("instagramUrl")}
                />
              </div>
              {errors.instagramUrl && <p className="text-xs text-red-400">{errors.instagramUrl.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook URL</Label>
              <div className="relative">
                <Facebook className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="facebookUrl"
                  placeholder="https://facebook.com/..."
                  className="pl-10 bg-white/5 border-white/10 rounded-xl h-11"
                  {...register("facebookUrl")}
                />
              </div>
              {errors.facebookUrl && <p className="text-xs text-red-400">{errors.facebookUrl.message as string}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="websiteUrl"
                  placeholder="https://yourwebsite.com"
                  className="pl-10 bg-white/5 border-white/10 rounded-xl h-11"
                  {...register("websiteUrl")}
                />
              </div>
              {errors.websiteUrl && <p className="text-xs text-red-400">{errors.websiteUrl.message as string}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 h-12 rounded-2xl font-bold shadow-xl shadow-violet-900/30 group"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Save className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            )}
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

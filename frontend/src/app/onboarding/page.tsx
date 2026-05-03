"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowRight, Loader2, Store, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { getDashboardPath } from "@/lib/permissions";

const vendorOnboardSchema = z.object({
  businessName: z.string().min(3, "Business name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
  city: z.string().min(2, "City is required"),
  phone: z.string().optional(),
});

const clientOnboardSchema = z.object({
  city: z.string().min(2, "City is required"),
  phone: z.string().optional(),
});

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const isVendor = user?.role === "VENDOR_OWNER";
  
  const schema = isVendor ? vendorOnboardSchema : clientOnboardSchema;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const businessName = watch("businessName");

  // Auto-generate slug from business name
  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("businessName", value);
    if (isVendor && !watch("slug")) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug);
    }
  };

  async function onSubmit(data: any) {
    setIsLoading(true);
    try {
      const endpoint = isVendor ? "/users/onboard/vendor" : "/users/onboard/client";
      await api.post(endpoint, data);
      
      toast.success("Profile setup complete! 🎉");
      router.push(getDashboardPath(user?.role || "CLIENT"));
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to save profile details.";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl shadow-violet-900/20">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              Event<span className="text-gradient">lio</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">Complete your profile</h1>
          <p className="text-sm text-foreground/50 text-center mb-8">
            {isVendor ? "Set up your business presence" : "Help us personalize your experience"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {isVendor && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <div className="relative">
                    <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <Input
                      id="businessName"
                      placeholder="e.g. Glamour Photography"
                      className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
                      {...register("businessName")}
                      onChange={handleBusinessNameChange}
                    />
                  </div>
                  {errors.businessName && <p className="text-xs text-red-400">{errors.businessName.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Profile URL slug</Label>
                  <div className="flex items-center">
                    <span className="bg-white/5 border border-r-0 border-white/15 rounded-l-xl h-11 px-3 flex items-center text-sm text-foreground/40">
                      eventlio.com/
                    </span>
                    <Input
                      id="slug"
                      placeholder="glamour-photography"
                      className="bg-white/5 border-white/15 focus:border-violet-500 rounded-r-xl rounded-l-none h-11"
                      {...register("slug")}
                    />
                  </div>
                  {errors.slug && <p className="text-xs text-red-400">{errors.slug.message as string}</p>}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="city"
                  placeholder="e.g. Lahore"
                  className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
                  {...register("city")}
                />
              </div>
              {errors.city && <p className="text-xs text-red-400">{errors.city.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="phone"
                  placeholder="+92 300 1234567"
                  className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
                  {...register("phone")}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-400">{errors.phone.message as string}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 rounded-xl h-11 text-sm font-semibold shadow-lg shadow-violet-900/30 group mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              )}
              {isLoading ? "Saving..." : "Complete Setup"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

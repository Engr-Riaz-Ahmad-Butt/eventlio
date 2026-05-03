"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Building2, Loader2, MapPin, Phone, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Category } from "@/types";

export default function VendorOnboardingPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    slug: "",
    city: "",
    phone: user?.phone ?? "",
    whatsappNumber: "",
    description: "",
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch {
        toast.error("Unable to load vendor categories.");
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (user?.vendorProfile) {
      setForm({
        businessName: user.vendorProfile.businessName ?? "",
        slug: user.vendorProfile.slug ?? "",
        city: user.vendorProfile.city ?? "",
        phone: user.vendorProfile.phone ?? user.phone ?? "",
        whatsappNumber: user.vendorProfile.whatsappNumber ?? "",
        description: user.vendorProfile.description ?? "",
      });
      setSelectedCategories(
        user.vendorProfile.categories?.map((item) => item.categoryId) ?? [],
      );
    }
  }, [user]);

  const generatedSlug = useMemo(
    () =>
      form.businessName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    [form.businessName],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      const response = await api.patch("/vendor-profiles/me/profile", {
        businessName: form.businessName,
        slug: form.slug || generatedSlug,
        city: form.city,
        phone: form.phone,
        whatsappNumber: form.whatsappNumber,
        description: form.description,
        categoryIds: selectedCategories,
        serviceAreas: [{ city: form.city }],
      });
      const me = await api.get("/auth/me");
      setUser(me.data.data);
      toast.success("Vendor profile created. You can now finish the full profile.");
      router.push("/vendor-dashboard/profile");
    } catch (error: any) {
      const message = error.response?.data?.message || "Unable to save vendor onboarding.";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl glass rounded-[2rem] p-8 sm:p-10">
        <div className="flex items-center gap-3 text-violet-300">
          <Sparkles className="h-5 w-5" />
          <p className="text-sm uppercase tracking-[0.3em]">Vendor onboarding</p>
        </div>
        <h1 className="mt-3 text-3xl font-black">Launch your public business profile.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/70">
          Start with the essentials. We&apos;ll send you to the full vendor profile editor right after this step.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="businessName">Business name</Label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <Input
                id="businessName"
                value={form.businessName}
                onChange={(event) => setForm((current) => ({ ...current, businessName: event.target.value }))}
                className="pl-10 bg-white/5 border-white/10 h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Public URL slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
              placeholder={generatedSlug || "your-business-name"}
              className="bg-white/5 border-white/10 h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Primary city</Label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <Input
                id="city"
                value={form.city}
                onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                className="pl-10 bg-white/5 border-white/10 h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Contact phone</Label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <Input
                id="phone"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                className="pl-10 bg-white/5 border-white/10 h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp number</Label>
            <Input
              id="whatsappNumber"
              value={form.whatsappNumber}
              onChange={(event) => setForm((current) => ({ ...current, whatsappNumber: event.target.value }))}
              className="bg-white/5 border-white/10 h-11"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Short business description</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm outline-none transition focus:border-violet-500"
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <Label>Service categories</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((category) => {
                const active = selectedCategories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setSelectedCategories((current) =>
                        active
                          ? current.filter((item) => item !== category.id)
                          : [...current, category.id],
                      )
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-violet-400/50 bg-violet-500/15"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <p className="font-semibold">{category.name}</p>
                    <p className="mt-2 text-xs text-foreground/60">{category.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
              {isSaving ? "Saving..." : "Create vendor profile"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

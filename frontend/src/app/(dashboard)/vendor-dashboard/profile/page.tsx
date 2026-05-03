"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";
import type { Category, ServiceArea, VendorGallery, VendorPackage, VendorProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ExternalLink, ImagePlus, Loader2, Plus, Save, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

type ProfileFormState = {
  businessName: string;
  slug: string;
  description: string;
  tagline: string;
  city: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  websiteUrl: string;
  coverImage: string;
  logo: string;
  isPublic: boolean;
  categoryIds: string[];
  serviceAreas: ServiceArea[];
};

type PackageFormState = {
  id?: string;
  title: string;
  description: string;
  price: string;
  discountPrice: string;
  duration: string;
  includedServices: string;
};

const emptyPackage: PackageFormState = {
  title: "",
  description: "",
  price: "",
  discountPrice: "",
  duration: "",
  includedServices: "",
};

export default function VendorProfilePage() {
  const { user, setUser } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProfileFormState>({
    businessName: "",
    slug: "",
    description: "",
    tagline: "",
    city: "",
    address: "",
    phone: "",
    whatsappNumber: "",
    instagramUrl: "",
    facebookUrl: "",
    websiteUrl: "",
    coverImage: "",
    logo: "",
    isPublic: true,
    categoryIds: [],
    serviceAreas: [],
  });
  const [packages, setPackages] = useState<VendorPackage[]>([]);
  const [gallery, setGallery] = useState<VendorGallery[]>([]);
  const [packageForm, setPackageForm] = useState<PackageFormState>(emptyPackage);
  const [galleryCaption, setGalleryCaption] = useState("");
  const [newServiceArea, setNewServiceArea] = useState({ city: "", area: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const publicUrl = useMemo(
    () =>
      form.slug
        ? `${typeof window !== "undefined" ? window.location.origin : ""}/vendors/${form.slug}`
        : "",
    [form.slug],
  );

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const [categoryResponse, profileResponse] = await Promise.all([
          api.get("/categories"),
          api.get("/vendor-profiles/me/profile").catch(() => null),
        ]);

        setCategories(categoryResponse.data.data);
        if (profileResponse?.data?.data) {
          hydrateProfile(profileResponse.data.data);
        }
      } catch {
        toast.error("Unable to load vendor profile data.");
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, []);

  function hydrateProfile(nextProfile: VendorProfile) {
    setPackages(nextProfile.packages ?? []);
    setGallery(nextProfile.gallery ?? []);
    setForm({
      businessName: nextProfile.businessName ?? "",
      slug: nextProfile.slug ?? "",
      description: nextProfile.description ?? "",
      tagline: nextProfile.tagline ?? "",
      city: nextProfile.city ?? "",
      address: nextProfile.address ?? "",
      phone: nextProfile.phone ?? user?.phone ?? "",
      whatsappNumber: nextProfile.whatsappNumber ?? "",
      instagramUrl: nextProfile.instagramUrl ?? "",
      facebookUrl: nextProfile.facebookUrl ?? "",
      websiteUrl: nextProfile.websiteUrl ?? "",
      coverImage: nextProfile.coverImage ?? "",
      logo: nextProfile.logo ?? "",
      isPublic: nextProfile.isPublic ?? true,
      categoryIds: nextProfile.categories?.map((item) => item.categoryId) ?? [],
      serviceAreas: nextProfile.serviceAreas ?? [],
    });
  }

  async function refreshCurrentUser() {
    const me = await api.get("/auth/me");
    setUser(me.data.data);
  }

  async function handleSaveProfile() {
    setIsSaving(true);
    try {
      const response = await api.patch("/vendor-profiles/me/profile", {
        ...form,
        serviceAreas: form.serviceAreas.map((area) => ({
          city: area.city,
          area: area.area,
        })),
      });
      hydrateProfile(response.data.data);
      await refreshCurrentUser();
      toast.success("Vendor profile saved.");
    } catch (error: any) {
      const message = error.response?.data?.message || "Unable to save vendor profile.";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsSaving(false);
    }
  }

  async function uploadImage(file: File) {
    const body = new FormData();
    body.append("file", file);
    const response = await api.post("/uploads/image?folder=eventlio/vendors", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data.url as string;
  }

  async function handleSingleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    field: "logo" | "coverImage",
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setForm((current) => ({ ...current, [field]: imageUrl }));
      toast.success(`${field === "logo" ? "Logo" : "Cover image"} uploaded.`);
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleGalleryUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      const response = await api.post("/vendor-gallery", {
        url: imageUrl,
        caption: galleryCaption,
        type: "image",
        sortOrder: gallery.length,
      });
      setGallery((current) => [...current, response.data.data]);
      setGalleryCaption("");
      toast.success("Gallery image added.");
    } catch {
      toast.error("Unable to add gallery image.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleDeleteGalleryItem(itemId: string) {
    try {
      await api.delete(`/vendor-gallery/${itemId}`);
      setGallery((current) => current.filter((item) => item.id !== itemId));
      toast.success("Gallery image removed.");
    } catch {
      toast.error("Unable to remove gallery image.");
    }
  }

  async function handleSavePackage() {
    try {
      const payload = {
        title: packageForm.title,
        description: packageForm.description,
        price: Number(packageForm.price || 0),
        discountPrice: packageForm.discountPrice ? Number(packageForm.discountPrice) : undefined,
        duration: packageForm.duration,
        includedServices: packageForm.includedServices
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (packageForm.id) {
        const response = await api.patch(`/vendor-packages/${packageForm.id}`, payload);
        setPackages((current) =>
          current.map((item) => (item.id === packageForm.id ? response.data.data : item)),
        );
        toast.success("Package updated.");
      } else {
        const response = await api.post("/vendor-packages", payload);
        setPackages((current) => [...current, response.data.data]);
        toast.success("Package created.");
      }

      setPackageForm(emptyPackage);
    } catch {
      toast.error("Unable to save package.");
    }
  }

  async function handleDeletePackage(packageId: string) {
    try {
      await api.delete(`/vendor-packages/${packageId}`);
      setPackages((current) => current.filter((item) => item.id !== packageId));
      toast.success("Package removed.");
    } catch {
      toast.error("Unable to remove package.");
    }
  }

  function toggleCategory(categoryId: string) {
    setForm((current) => ({
      ...current,
      categoryIds: current.categoryIds.includes(categoryId)
        ? current.categoryIds.filter((item) => item !== categoryId)
        : [...current.categoryIds, categoryId],
    }));
  }

  function addServiceArea() {
    if (!newServiceArea.city.trim()) return;
    setForm((current) => ({
      ...current,
      serviceAreas: [
        ...current.serviceAreas,
        {
          id: `${Date.now()}`,
          vendorId: current.slug,
          city: newServiceArea.city,
          area: newServiceArea.area,
        },
      ],
    }));
    setNewServiceArea({ city: "", area: "" });
  }

  function removeServiceArea(index: number) {
    setForm((current) => ({
      ...current,
      serviceAreas: current.serviceAreas.filter((_, currentIndex) => currentIndex !== index),
    }));
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/vendor-dashboard" className="inline-flex items-center text-sm text-foreground/60 hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold">Vendor profile editor</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Complete your public profile, portfolio, and pricing in one place.
          </p>
        </div>
        {form.slug ? (
          <Link
            href={`/vendors/${form.slug}`}
            className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground/85 transition hover:bg-white/10"
          >
            View public page
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="glass-strong rounded-3xl border border-white/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold">Business details</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="businessName">Business name</Label>
              <Input id="businessName" value={form.businessName} onChange={(event) => setForm((current) => ({ ...current, businessName: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Public URL slug</Label>
              <Input id="slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Primary city</Label>
              <Input id="city" value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp</Label>
              <Input id="whatsappNumber" value={form.whatsappNumber} onChange={(event) => setForm((current) => ({ ...current, whatsappNumber: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" value={form.tagline} onChange={(event) => setForm((current) => ({ ...current, tagline: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <textarea id="description" rows={5} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm outline-none transition focus:border-violet-500" />
            </div>
          </div>
        </section>

        <section className="glass-strong rounded-3xl border border-white/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold">Visibility and media</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div>
                <p className="font-semibold">Public profile</p>
                <p className="text-xs text-foreground/60">Allow clients to access your public page by URL.</p>
              </div>
              <input
                type="checkbox"
                checked={form.isPublic}
                onChange={(event) => setForm((current) => ({ ...current, isPublic: event.target.checked }))}
                className="h-4 w-4"
              />
            </div>

            <div className="space-y-2">
              <Label>Logo upload</Label>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground/75">
                <span>{form.logo ? "Replace logo image" : "Upload logo image"}</span>
                <UploadCloud className="h-4 w-4" />
                <input type="file" accept="image/*" className="hidden" onChange={(event) => void handleSingleImageUpload(event, "logo")} />
              </label>
              {form.logo ? <img src={form.logo} alt="Logo preview" className="h-28 w-28 rounded-2xl object-cover" /> : null}
            </div>

            <div className="space-y-2">
              <Label>Cover upload</Label>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground/75">
                <span>{form.coverImage ? "Replace cover image" : "Upload cover image"}</span>
                <UploadCloud className="h-4 w-4" />
                <input type="file" accept="image/*" className="hidden" onChange={(event) => void handleSingleImageUpload(event, "coverImage")} />
              </label>
              {form.coverImage ? <img src={form.coverImage} alt="Cover preview" className="h-36 w-full rounded-2xl object-cover" /> : null}
            </div>
          </div>
        </section>
      </div>

      <section className="glass-strong rounded-3xl border border-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-bold">Categories and service areas</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <Label>Categories</Label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {categories.map((category) => {
                const active = form.categoryIds.includes(category.id);
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active ? "border-violet-400/50 bg-violet-500/15" : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <p className="font-semibold">{category.name}</p>
                    <p className="mt-2 text-xs text-foreground/60">{category.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Service areas</Label>
            <div className="mt-3 flex gap-2">
              <Input placeholder="City" value={newServiceArea.city} onChange={(event) => setNewServiceArea((current) => ({ ...current, city: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
              <Input placeholder="Area (optional)" value={newServiceArea.area} onChange={(event) => setNewServiceArea((current) => ({ ...current, area: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
              <Button type="button" onClick={addServiceArea} className="h-11 rounded-xl">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              {form.serviceAreas.map((area, index) => (
                <div key={`${area.city}-${area.area}-${index}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  <span>{area.city}{area.area ? `, ${area.area}` : ""}</span>
                  <button type="button" onClick={() => removeServiceArea(index)} className="text-red-300 hover:text-red-200">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-strong rounded-3xl border border-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-bold">Social links</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="instagramUrl">Instagram</Label>
            <Input id="instagramUrl" value={form.instagramUrl} onChange={(event) => setForm((current) => ({ ...current, instagramUrl: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebookUrl">Facebook</Label>
            <Input id="facebookUrl" value={form.facebookUrl} onChange={(event) => setForm((current) => ({ ...current, facebookUrl: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website</Label>
            <Input id="websiteUrl" value={form.websiteUrl} onChange={(event) => setForm((current) => ({ ...current, websiteUrl: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
          </div>
        </div>
      </section>

      <section className="glass-strong rounded-3xl border border-white/5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Packages and pricing</h2>
          <p className="text-sm text-foreground/60">{packages.length} package(s)</p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            <Label>Package editor</Label>
            <Input placeholder="Title" value={packageForm.title} onChange={(event) => setPackageForm((current) => ({ ...current, title: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            <textarea rows={4} placeholder="Description" value={packageForm.description} onChange={(event) => setPackageForm((current) => ({ ...current, description: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm outline-none transition focus:border-violet-500" />
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Price" value={packageForm.price} onChange={(event) => setPackageForm((current) => ({ ...current, price: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
              <Input placeholder="Discount price" value={packageForm.discountPrice} onChange={(event) => setPackageForm((current) => ({ ...current, discountPrice: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            </div>
            <Input placeholder="Duration" value={packageForm.duration} onChange={(event) => setPackageForm((current) => ({ ...current, duration: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            <Input placeholder="Included services separated by commas" value={packageForm.includedServices} onChange={(event) => setPackageForm((current) => ({ ...current, includedServices: event.target.value }))} className="bg-white/5 border-white/10 h-11" />
            <div className="flex gap-3">
              <Button type="button" onClick={handleSavePackage} className="rounded-xl">
                <Save className="mr-2 h-4 w-4" />
                {packageForm.id ? "Update package" : "Add package"}
              </Button>
              {packageForm.id ? (
                <Button type="button" variant="outline" className="border-white/10 bg-white/5" onClick={() => setPackageForm(emptyPackage)}>
                  Cancel edit
                </Button>
              ) : null}
            </div>
          </div>

          <div className="space-y-3">
            {packages.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold">{item.title}</p>
                    <p className="mt-1 text-sm text-foreground/65">{item.description}</p>
                    <p className="mt-3 text-sm font-semibold">PKR {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" size="sm" variant="outline" className="border-white/10 bg-white/5" onClick={() => setPackageForm({
                      id: item.id,
                      title: item.title,
                      description: item.description ?? "",
                      price: String(item.price),
                      discountPrice: item.discountPrice ? String(item.discountPrice) : "",
                      duration: item.duration ?? "",
                      includedServices: item.includedServices.join(", "),
                    })}>
                      Edit
                    </Button>
                    <Button type="button" size="sm" variant="outline" className="border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/20" onClick={() => void handleDeletePackage(item.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-strong rounded-3xl border border-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-bold">Portfolio gallery</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            <Label htmlFor="galleryCaption">Gallery caption</Label>
            <Input id="galleryCaption" value={galleryCaption} onChange={(event) => setGalleryCaption(event.target.value)} className="bg-white/5 border-white/10 h-11" />
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground/75">
              <span>Add gallery image</span>
              <ImagePlus className="h-4 w-4" />
              <input type="file" accept="image/*" className="hidden" onChange={(event) => void handleGalleryUpload(event)} />
            </label>
            {isUploading ? <p className="text-sm text-foreground/60">Uploading image...</p> : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {gallery.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <img src={item.url} alt={item.caption || "Gallery item"} className="h-44 w-full rounded-xl object-cover" />
                <div className="mt-3 flex items-start justify-between gap-3">
                  <p className="text-sm text-foreground/75">{item.caption || "No caption"}</p>
                  <button type="button" onClick={() => void handleDeleteGalleryItem(item.id)} className="text-red-300 hover:text-red-200">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-foreground/60">
          {publicUrl ? (
            <>
              Public URL:{" "}
              <a href={publicUrl} target="_blank" rel="noreferrer" className="text-violet-300 underline underline-offset-4">
                {publicUrl}
              </a>
            </>
          ) : (
            "Add a slug to generate your public URL."
          )}
        </div>
        <Button onClick={handleSaveProfile} disabled={isSaving || isUploading} className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save vendor profile
        </Button>
      </div>
    </div>
  );
}

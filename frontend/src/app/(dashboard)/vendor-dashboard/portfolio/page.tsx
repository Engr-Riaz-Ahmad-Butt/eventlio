"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  X, 
  Loader2, 
  Plus, 
  Trash2,
  Image as ImageIcon,
  Grid
} from "lucide-react";
import { toast } from "sonner";

export default function PortfolioPage() {
  const { user } = useAuthStore();
  const [gallery, setGallery] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchGallery = useCallback(async () => {
    if (!user?.vendorProfile?.id) return;
    try {
      const res = await api.get(`/vendor-gallery/vendor/${user.vendorProfile.id}`);
      setGallery(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch gallery");
    } finally {
      setIsFetching(false);
    }
  }, [user?.vendorProfile?.id]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      // 1. Upload to Cloudinary via our backend
      const uploadRes = await api.post("/uploads/image?folder=gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      const { url } = uploadRes.data.data;

      // 2. Save to VendorGallery in DB
      await api.post("/vendor-gallery", {
        url,
        type: "IMAGE",
        sortOrder: gallery.length,
      });

      toast.success("Image uploaded to portfolio!");
      fetchGallery();
    } catch (err: any) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/vendor-gallery/${id}`);
      toast.success("Item removed from portfolio");
      setGallery(gallery.filter((item) => item.id !== id));
    } catch (err) {
      toast.error("Failed to delete item");
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold">Portfolio & Gallery</h1>
          <p className="text-foreground/50">Showcase your best work to potential clients.</p>
        </div>
        
        <div className="relative">
          <input
            type="file"
            id="gallery-upload"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
          <Label htmlFor="gallery-upload">
            <Button asChild disabled={isUploading} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl px-6 h-11 cursor-pointer">
              <span>
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {isUploading ? "Uploading..." : "Add New Image"}
              </span>
            </Button>
          </Label>
        </div>
      </div>

      {gallery.length === 0 ? (
        <div className="glass-strong rounded-3xl border border-dashed border-white/10 p-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <ImageIcon className="w-10 h-10 text-foreground/20" />
          </div>
          <h3 className="text-xl font-bold mb-2">No items in your portfolio</h3>
          <p className="text-foreground/40 max-w-sm">
            Upload high-quality images of your work to attract more clients and show off your skills.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="group relative aspect-square glass-strong rounded-3xl border border-white/5 overflow-hidden">
              <img 
                src={item.url} 
                alt={item.caption || "Portfolio item"} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                <Button 
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full p-0 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {item.caption && <p className="text-xs text-white px-4 text-center">{item.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Separate component for Label to avoid Next.js hydration issues with raw HTML tags
function Label({ children, htmlFor }: { children: React.ReactNode, htmlFor: string }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}

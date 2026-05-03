"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X,
  Loader2,
  CheckCircle2,
  Clock,
  Tag
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function PackagesPage() {
  const { user } = useAuthStore();
  const [packages, setPackages] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);

  const fetchPackages = useCallback(async () => {
    if (!user?.vendorProfile?.id) return;
    try {
      const res = await api.get(`/vendor-packages/vendor/${user.vendorProfile.id}`);
      setPackages(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch packages");
    } finally {
      setIsFetching(false);
    }
  }, [user?.vendorProfile?.id]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      duration: formData.get("duration") as string,
      includedServices: (formData.get("includedServices") as string).split("\n").filter(i => i.trim()),
    };

    setIsSubmitting(true);
    try {
      if (editingPackage) {
        await api.patch(`/vendor-packages/${editingPackage.id}`, data);
        toast.success("Package updated!");
      } else {
        await api.post("/vendor-packages", data);
        toast.success("Package created!");
      }
      setIsDialogOpen(false);
      setEditingPackage(null);
      fetchPackages();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save package");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      await api.delete(`/vendor-packages/${id}`);
      toast.success("Package deleted");
      setPackages(packages.filter(p => p.id !== id));
    } catch (err) {
      toast.error("Failed to delete package");
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
          <h1 className="text-2xl font-bold">Packages & Pricing</h1>
          <p className="text-foreground/50">Define your service bundles and their costs.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingPackage(null);
        }}>
          <Button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl px-6 h-11"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Package
          </Button>
          <DialogContent className="bg-[#0b081a] border-white/10 text-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {editingPackage ? "Edit Package" : "Create New Package"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/60">Package Title</label>
                <Input 
                  name="title" 
                  defaultValue={editingPackage?.title} 
                  placeholder="e.g. Premium Wedding Shoot" 
                  required 
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/60">Price (Rs.)</label>
                  <Input 
                    name="price" 
                    type="number" 
                    defaultValue={editingPackage?.price} 
                    placeholder="50000" 
                    required 
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/60">Duration</label>
                  <Input 
                    name="duration" 
                    defaultValue={editingPackage?.duration} 
                    placeholder="e.g. 6 Hours" 
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/60">Description</label>
                <Textarea 
                  name="description" 
                  defaultValue={editingPackage?.description} 
                  placeholder="What's included in this package?" 
                  className="bg-white/5 border-white/10 min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/60">Included Services (one per line)</label>
                <Textarea 
                  name="includedServices" 
                  defaultValue={editingPackage?.includedServices?.join("\n")} 
                  placeholder="Full day coverage&#10;Unlimited edited photos&#10;Digital gallery" 
                  className="bg-white/5 border-white/10 min-h-[100px]"
                />
              </div>
              <DialogFooter className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl h-11"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  {editingPackage ? "Update Package" : "Create Package"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="glass-strong rounded-3xl border border-white/5 flex flex-col overflow-hidden group">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                  <Package className="w-6 h-6" />
                </div>
                <div className="flex gap-1">
                  <Button 
                    onClick={() => {
                      setEditingPackage(pkg);
                      setIsDialogOpen(true);
                    }}
                    variant="ghost" 
                    className="w-8 h-8 p-0 text-foreground/40 hover:text-white hover:bg-white/5"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={() => handleDelete(pkg.id)}
                    variant="ghost" 
                    className="w-8 h-8 p-0 text-foreground/40 hover:text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold">{pkg.title}</h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Tag className="w-4 h-4" />
                  Rs. {pkg.price.toLocaleString()}
                </div>
                {pkg.duration && (
                  <div className="flex items-center gap-1.5 text-foreground/40 text-sm">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 flex-1 space-y-6">
              {pkg.description && (
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {pkg.description}
                </p>
              )}
              
              {pkg.includedServices?.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground/30">What's Included</p>
                  <ul className="space-y-2">
                    {pkg.includedServices.map((service: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

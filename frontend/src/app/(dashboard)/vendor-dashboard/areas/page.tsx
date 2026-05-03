"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Loader2, 
  Map as MapIcon,
  Search
} from "lucide-react";
import { toast } from "sonner";

export default function ServiceAreasPage() {
  const { user } = useAuthStore();
  const [areas, setAreas] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newArea, setNewArea] = useState("");

  const fetchAreas = useCallback(async () => {
    if (!user?.vendorProfile?.id) return;
    try {
      const res = await api.get(`/service-areas/vendor/${user.vendorProfile.id}`);
      setAreas(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch service areas");
    } finally {
      setIsFetching(false);
    }
  }, [user?.vendorProfile?.id]);

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newCity) return;

    setIsSubmitting(true);
    try {
      await api.post("/service-areas", { city: newCity, area: newArea });
      toast.success("Service area added!");
      setNewCity("");
      setNewArea("");
      fetchAreas();
    } catch (err) {
      toast.error("Failed to add area");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/service-areas/${id}`);
      toast.success("Area removed");
      setAreas(areas.filter(a => a.id !== id));
    } catch (err) {
      toast.error("Failed to remove area");
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
      <div>
        <h1 className="text-2xl font-bold">Service Areas</h1>
        <p className="text-foreground/50">Specify the cities and neighborhoods where you provide services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add New Area */}
        <div className="md:col-span-1">
          <div className="glass-strong rounded-3xl border border-white/5 p-6 sticky top-24">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-violet-400" />
              Add New Area
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground/40">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                  <Input 
                    placeholder="e.g. Lahore" 
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    required
                    className="pl-9 bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground/40">Specific Area (Optional)</label>
                <Input 
                  placeholder="e.g. Gulberg III" 
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting || !newCity}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl h-11 mt-2"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                Add Location
              </Button>
            </form>
          </div>
        </div>

        {/* Areas List */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Current Service Areas</h3>
            <span className="text-xs text-foreground/40">{areas.length} Locations</span>
          </div>

          {areas.length === 0 ? (
            <div className="glass-strong rounded-3xl border border-dashed border-white/10 p-12 text-center">
              <MapIcon className="w-10 h-10 text-foreground/10 mx-auto mb-4" />
              <p className="text-foreground/40 text-sm">No service areas added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {areas.map((item) => (
                <div key={item.id} className="glass-strong p-4 rounded-2xl border border-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.city}</p>
                      {item.area && <p className="text-xs text-foreground/40">{item.area}</p>}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDelete(item.id)}
                    variant="ghost" 
                    className="w-8 h-8 p-0 text-foreground/20 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-400">Pro Tip</h4>
              <p className="text-xs text-foreground/60 mt-1 leading-relaxed">
                Adding specific areas helps clients find you when they search for services in their neighborhood. 
                Keep your cities accurate to ensure you appear in relevant search results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

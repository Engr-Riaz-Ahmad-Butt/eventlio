"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, MapPin, Phone, User } from "lucide-react";
import { toast } from "sonner";

type ClientOnboardingValues = {
  name: string;
  phone: string;
  city: string;
  address: string;
};

export default function ClientOnboardingPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm<ClientOnboardingValues>({
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        phone: user.phone ?? user.clientProfile?.phone ?? "",
        city: user.clientProfile?.city ?? "",
        address: user.clientProfile?.address ?? "",
      });
    }
  }, [user, reset]);

  async function onSubmit(values: ClientOnboardingValues) {
    setIsSaving(true);
    try {
      const response = await api.patch("/users/me", {
        name: values.name,
        phone: values.phone,
        city: values.city,
        address: values.address,
        completeOnboarding: true,
      });
      setUser(response.data.data);
      toast.success("Client profile setup complete.");
      router.push("/client-dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Unable to save onboarding details.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl glass rounded-[2rem] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Client onboarding</p>
        <h1 className="mt-3 text-3xl font-black">Tell us where and how you book event services.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/70">
          We use this to personalize vendor recommendations and keep your booking details organized.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <Input id="name" className="pl-10 bg-white/5 border-white/10 h-11" {...register("name")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <Input id="phone" className="pl-10 bg-white/5 border-white/10 h-11" {...register("phone")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <Input id="city" className="pl-10 bg-white/5 border-white/10 h-11" {...register("city")} />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" className="bg-white/5 border-white/10 h-11" {...register("address")} />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
              {isSaving ? "Saving..." : "Finish onboarding"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

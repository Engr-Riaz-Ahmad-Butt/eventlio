"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema, type VerifyOtpFormData } from "@/schemas/auth.schema";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";
import { getDashboardPath } from "@/lib/permissions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { Suspense } from "react";
// ... (existing imports, but I will just wrap the component logic inside a sub-component)
function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { email },
  });

  async function onSubmit(data: VerifyOtpFormData) {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/verify-otp", data);
      const { accessToken, refreshToken, user } = response.data.data;

      login(accessToken, refreshToken, user);
      document.cookie = `eventlio_access_token=${accessToken}; path=/; max-age=900; SameSite=Lax`;

      toast.success("Email verified! Welcome to Eventlio! 🎉");
      router.push(getDashboardPath(user.role));
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Verification failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl shadow-violet-900/20">
      <Link href="/" className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Zap className="w-6 h-6 text-white fill-white" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight">
          Event<span className="text-gradient">lio</span>
        </span>
      </Link>

      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-2">Verify your email</h1>
      <p className="text-sm text-foreground/50 text-center mb-8">
        We sent a 6-digit code to <span className="text-foreground font-medium">{email}</span>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input type="hidden" {...register("email")} />

        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            placeholder="123456"
            maxLength={6}
            className="bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-12 text-center text-2xl tracking-[0.5em] font-mono"
            {...register("otp")}
          />
          {errors.otp && <p className="text-xs text-red-400 text-center">{errors.otp.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 rounded-xl h-11 text-sm font-semibold shadow-lg shadow-violet-900/30 group"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
          )}
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </Button>
      </form>

      <p className="text-sm text-foreground/50 text-center mt-6">
        Didn't receive the code?{" "}
        <button className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
          Resend
        </button>
      </p>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-violet-500" /></div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}

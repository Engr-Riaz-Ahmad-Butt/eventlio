"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/schemas/auth.schema";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, Suspense } from "react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: emailParam },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setIsLoading(true);
    try {
      await api.post("/auth/reset-password", data);
      toast.success("Password reset successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to reset password.";
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

      <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
      <p className="text-sm text-foreground/50 text-center mb-8">
        Enter the OTP sent to your email and a new password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="space-y-2 hidden">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              id="email"
              type="email"
              className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code (OTP)</Label>
          <Input
            id="otp"
            placeholder="123456"
            maxLength={6}
            className="bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-12 text-center text-2xl tracking-[0.5em] font-mono"
            {...register("otp")}
          />
          {errors.otp && <p className="text-xs text-red-400 text-center">{errors.otp.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
              {...register("newPassword")}
            />
          </div>
          {errors.newPassword && <p className="text-xs text-red-400">{errors.newPassword.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
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
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>

      <p className="text-sm text-foreground/50 text-center mt-6">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-violet-500" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

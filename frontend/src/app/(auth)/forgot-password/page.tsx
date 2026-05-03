"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth.schema";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsLoading(true);
    try {
      await api.post("/auth/forgot-password", data);
      toast.success("If this email exists, a reset code has been sent.");
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
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

      <h1 className="text-2xl font-bold text-center mb-2">Forgot password?</h1>
      <p className="text-sm text-foreground/50 text-center mb-8">
        Enter your email and we'll send you a reset code
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
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
          {isLoading ? "Sending..." : "Send reset code"}
        </Button>
      </form>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm text-foreground/50 hover:text-foreground mt-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to sign in
      </Link>
    </div>
  );
}

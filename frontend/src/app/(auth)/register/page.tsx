"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, User, Phone, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CLIENT" },
  });

  const selectedRole = watch("role");

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      await api.post("/auth/register", payload);

      toast.success("Account created! Check your email for OTP.");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl shadow-violet-900/20">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Zap className="w-6 h-6 text-white fill-white" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight">
          Event<span className="text-gradient">lio</span>
        </span>
      </Link>

      <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
      <p className="text-sm text-foreground/50 text-center mb-6">
        Join thousands of event professionals
      </p>

      {/* Role selector */}
      <div className="flex gap-2 mb-6">
        {[
          { value: "CLIENT" as const, label: "Client", desc: "Book services" },
          { value: "VENDOR_OWNER" as const, label: "Vendor", desc: "Offer services" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setValue("role", option.value)}
            className={`flex-1 p-3 rounded-xl border text-center transition-all duration-200 ${
              selectedRole === option.value
                ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-900/20"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <p className="text-sm font-semibold">{option.label}</p>
            <p className="text-xs text-foreground/50">{option.desc}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              id="name"
              placeholder="John Doe"
              className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
              {...register("name")}
            />
          </div>
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>

        {/* Email */}
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

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              id="phone"
              placeholder="+923001234567"
              className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
              {...register("phone")}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10 bg-white/5 border-white/15 focus:border-violet-500 rounded-xl h-11"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
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

        {/* Submit */}
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
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-sm text-foreground/50 text-center mt-6">
        Already have an account?{" "}
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

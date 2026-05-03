"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export default function OnboardingRouterPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    if (user.role === "CLIENT") {
      router.replace("/onboarding/client");
      return;
    }

    router.replace("/onboarding/vendor");
  }, [router, user]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-foreground/70">
        <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
        Routing to the right onboarding flow...
      </div>
    </main>
  );
}

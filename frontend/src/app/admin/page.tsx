"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl glass rounded-[2rem] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Admin</p>
        <h1 className="mt-3 text-3xl font-black">Admin panel shell is protected and ready.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/70">
          This route is now gated behind role-aware middleware. Vendor and client accounts will be redirected away
          from it automatically.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground/80 transition hover:bg-white/10"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}

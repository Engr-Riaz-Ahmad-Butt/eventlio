"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  Image as ImageIcon, 
  Package, 
  MapPin, 
  Settings, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

const navItems = [
  { href: "/vendor-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendor-dashboard/profile", label: "Business Profile", icon: User },
  { href: "/vendor-dashboard/portfolio", label: "Portfolio & Gallery", icon: ImageIcon },
  { href: "/vendor-dashboard/packages", label: "Packages & Pricing", icon: Package },
  { href: "/vendor-dashboard/areas", label: "Service Areas", icon: MapPin },
  { href: "/vendor-dashboard/settings", label: "Settings", icon: Settings },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#030014] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#030014]/50 backdrop-blur-xl hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Eventlio</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" 
                    : "text-foreground/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-violet-400" : "text-foreground/40"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          {user?.vendorProfile?.slug && (
            <Link
              href={`/vendors/${user.vendorProfile.slug}`}
              target="_blank"
              className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-medium">View Public Page</span>
              </div>
              <ChevronRight className="w-4 h-4 text-foreground/30 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#030014]/50 backdrop-blur-xl sticky top-0 z-40">
          <h2 className="text-sm font-medium text-foreground/60">
            {navItems.find(item => item.href === pathname)?.label || "Dashboard"}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-foreground/40 uppercase tracking-wider">{user?.role?.replace("_", " ")}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center">
              <User className="w-5 h-5 text-violet-400" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

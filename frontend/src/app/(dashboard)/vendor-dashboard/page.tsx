"use client";

import { useAuthStore } from "@/store/auth-store";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Star,
  Plus,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VendorDashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    { label: "Active Bookings", value: "12", icon: Calendar, color: "text-blue-400" },
    { label: "Total Revenue", value: "Rs. 125,000", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Pending Reviews", value: "4", icon: Star, color: "text-amber-400" },
    { label: "New Inquiries", value: "8", icon: Users, color: "text-violet-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.vendorProfile?.businessName || user?.name}!</h1>
          <p className="text-foreground/50 mt-1">Here's what's happening with your business today.</p>
        </div>
        
        <div className="flex gap-3">
          <Button className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-xl px-6">
            Generate Report
          </Button>
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-violet-900/20 rounded-xl px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add New Package
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-strong p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                +12%
              </span>
            </div>
            <p className="text-sm text-foreground/40 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 glass-strong rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-bold">Recent Bookings</h3>
            <Button variant="link" className="text-violet-400 text-xs p-0 h-auto">
              View all <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-foreground/40 uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Package</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium">Sarah Khan</div>
                      <div className="text-xs text-foreground/40">sarah@example.com</div>
                    </td>
                    <td className="px-6 py-4 text-foreground/60">Bridal Makeup</td>
                    <td className="px-6 py-4 text-foreground/60">Oct 24, 2026</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tips/Notifications */}
        <div className="glass-strong rounded-3xl border border-white/5 p-6 space-y-6">
          <h3 className="font-bold">Notifications</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/20 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight">New Review Received</p>
                  <p className="text-xs text-foreground/40 mt-1 line-clamp-2">"Amazing service, highly recommend to everyone!"</p>
                  <p className="text-[10px] text-foreground/20 mt-2">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full bg-white/5 hover:bg-white/10 text-foreground/60 text-xs rounded-xl">
            View All Notifications
          </Button>
        </div>
      </div>
    </div>
  );
}

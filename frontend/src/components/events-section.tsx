"use client";

import { useQuery } from "@tanstack/react-query";
import { useGsapFadeUp } from "@/hooks/use-gsap";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Clock,
} from "lucide-react";

// ─── Mock API ────────────────────────────────────────────────
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  price: string;
  image: string;
  gradient: string;
  featured?: boolean;
}

const MOCK_EVENTS: Event[] = [
  {
    id: "evt-1",
    title: "Web3 Global Summit 2025",
    date: "Jun 14, 2025",
    time: "9:00 AM",
    location: "San Francisco, CA",
    attendees: 2410,
    maxAttendees: 3000,
    category: "Tech",
    price: "$149",
    image: "from-violet-600 to-indigo-700",
    gradient: "from-violet-600 to-indigo-700",
    featured: true,
  },
  {
    id: "evt-2",
    title: "Creative Design Conference",
    date: "Jul 2, 2025",
    time: "10:00 AM",
    location: "New York, NY",
    attendees: 870,
    maxAttendees: 1000,
    category: "Design",
    price: "$89",
    image: "from-pink-600 to-rose-700",
    gradient: "from-pink-600 to-rose-700",
  },
  {
    id: "evt-3",
    title: "AI & Machine Learning Workshop",
    date: "Aug 8, 2025",
    time: "1:00 PM",
    location: "Austin, TX",
    attendees: 340,
    maxAttendees: 400,
    category: "AI",
    price: "Free",
    image: "from-cyan-600 to-blue-700",
    gradient: "from-cyan-600 to-blue-700",
  },
  {
    id: "evt-4",
    title: "Startup Founder Mixer",
    date: "Aug 20, 2025",
    time: "7:00 PM",
    location: "Los Angeles, CA",
    attendees: 520,
    maxAttendees: 600,
    category: "Business",
    price: "$29",
    image: "from-amber-600 to-orange-700",
    gradient: "from-amber-600 to-orange-700",
  },
  {
    id: "evt-5",
    title: "Electronic Music Festival",
    date: "Sep 5–7, 2025",
    time: "4:00 PM",
    location: "Miami, FL",
    attendees: 8200,
    maxAttendees: 10000,
    category: "Music",
    price: "$199",
    image: "from-emerald-600 to-teal-700",
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    id: "evt-6",
    title: "Photography Masterclass",
    date: "Sep 18, 2025",
    time: "11:00 AM",
    location: "Chicago, IL",
    attendees: 120,
    maxAttendees: 150,
    category: "Arts",
    price: "$49",
    image: "from-fuchsia-600 to-purple-700",
    gradient: "from-fuchsia-600 to-purple-700",
  },
];

async function fetchEvents(): Promise<Event[]> {
  await new Promise((r) => setTimeout(r, 800)); // simulate network
  return MOCK_EVENTS;
}

// ─── Category colours ─────────────────────────────────────────
const categoryStyles: Record<string, string> = {
  Tech: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Design: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  AI: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Business: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Music: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Arts: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
};

// ─── Components ───────────────────────────────────────────────
function EventCard({ event }: { event: Event }) {
  const pct = Math.round((event.attendees / event.maxAttendees) * 100);
  return (
    <article
      id={`event-card-${event.id}`}
      className="gsap-reveal glass rounded-2xl overflow-hidden group hover:glass-strong hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Colour banner */}
      <div className={`h-36 bg-gradient-to-br ${event.gradient} relative`}>
        {event.featured && (
          <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-white/20 backdrop-blur px-2.5 py-1 rounded-full border border-white/30">
            ⚡ Featured
          </span>
        )}
        <div className="absolute bottom-3 right-3">
          <span className="text-xl font-black text-white/90">{event.price}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2">
            {event.title}
          </h3>
          <Badge className={`text-[10px] shrink-0 border ${categoryStyles[event.category] ?? ""}`}>
            {event.category}
          </Badge>
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-foreground/50">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-violet-400" />
            {event.date}
            <Clock className="w-3.5 h-3.5 text-violet-400 ml-2" />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-violet-400" />
            {event.location}
          </span>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[10px] text-foreground/40 mb-1">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {event.attendees.toLocaleString()} attending
            </span>
            <span>{pct}% full</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <Button
          id={`register-${event.id}`}
          size="sm"
          className="w-full mt-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 rounded-xl group/btn"
        >
          Register Now
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </article>
  );
}

function EventCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <Skeleton className="h-36 w-full rounded-none bg-white/5" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-3/4 bg-white/5" />
        <Skeleton className="h-3 w-1/2 bg-white/5" />
        <Skeleton className="h-3 w-2/3 bg-white/5" />
        <Skeleton className="h-1 w-full bg-white/5" />
        <Skeleton className="h-9 w-full bg-white/5 mt-1" />
      </div>
    </div>
  );
}

export function EventsSection() {
  const sectionRef = useGsapFadeUp<HTMLElement>({ stagger: 0.08, y: 20 });

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  return (
    <section
      ref={sectionRef}
      id="discover"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="gsap-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold text-violet-400 tracking-widest uppercase mb-3">
              Discover
            </p>
            <h2 className="text-4xl sm:text-5xl font-black">
              Upcoming <span className="text-gradient">Events</span>
            </h2>
          </div>
          <Button
            id="view-all-events"
            variant="outline"
            className="glass border-white/20 hover:bg-white/10 rounded-xl shrink-0"
          >
            View All Events
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
            : events?.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  );
}

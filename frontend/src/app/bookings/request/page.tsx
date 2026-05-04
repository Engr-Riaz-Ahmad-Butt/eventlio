import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BookingRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ vendor?: string; package?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="market-shell min-h-screen px-6 py-28">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-[color:rgba(27,77,62,0.08)] bg-white p-8 shadow-[var(--shadow-lg)] sm:p-10">
        <p className="section-label">Module 04 Handoff</p>
        <h1 className="display-h2 mt-4 text-[var(--dark)]">Booking request flow ready to continue.</h1>
        <p className="mt-4 leading-8 text-[var(--gray-text)]">
          Module 03 successfully handed off the selected vendor into the booking trigger step.
          When Module 04 is implemented fully, this route will collect event details, package choice,
          preferred date, and notes before creating a booking request.
        </p>

        <div className="mt-8 rounded-[24px] bg-[var(--warm-white)] p-5 text-sm text-[var(--gray-text)]">
          <p>
            <span className="font-semibold text-[var(--dark)]">Selected vendor:</span>{" "}
            {params.vendor ?? "Not provided"}
          </p>
          <p className="mt-2">
            <span className="font-semibold text-[var(--dark)]">Selected package:</span>{" "}
            {params.package ?? "None"}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="gold" asChild>
            <Link href={`/vendor/${params.vendor ?? ""}`}>Back to Vendor Profile</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/vendors">Browse More Vendors</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

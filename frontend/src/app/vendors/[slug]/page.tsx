import { redirect } from "next/navigation";

export default async function LegacyVendorProfileRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/vendor/${slug}`);
}

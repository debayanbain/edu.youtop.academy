import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NoticeBoard } from "@/components/notices/notice-board";
import {
  NOTICE_TYPE_ORDER,
  NOTICE_TYPE_META,
  metaForSlug,
} from "@/components/notices/notice-meta";

/**
 * One dynamic route serves every notice_type (/notices/job, /notices/admit-card,
 * ...) — a single page component, not nine. Unknown slugs 404. SEO title/desc
 * per type via generateMetadata.
 */
export function generateStaticParams() {
  return NOTICE_TYPE_ORDER.map((t) => ({ type: NOTICE_TYPE_META[t].slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const meta = metaForSlug(type);
  if (!meta) return { title: "Notices — YouTOP" };
  return {
    title: `${meta.heading} — YouTOP`,
    description: `Latest ${meta.heading.toLowerCase()} from official government sources, updated regularly.`,
  };
}

export default async function NoticeTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const meta = metaForSlug(type);
  if (!meta) notFound();
  return <NoticeBoard initialType={meta.type} heading={meta.heading} />;
}

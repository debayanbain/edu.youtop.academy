import type { Metadata } from "next";
import { NoticeBoard } from "@/components/notices/notice-board";

export const metadata: Metadata = {
  title: "Government Notices — YouTOP",
  description:
    "Search and filter Indian government jobs, results, admit cards, answer keys, cut-offs, merit lists and scholarships — aggregated from official sources.",
};

export default function NoticesPage() {
  return <NoticeBoard />;
}

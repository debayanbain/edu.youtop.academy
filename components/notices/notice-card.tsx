"use client";

import { LuBuilding2, LuCalendar, LuExternalLink } from "react-icons/lu";
import type { Notice } from "@/lib/content-adapters";
import { badgeFor, labelFor } from "./notice-meta";

const fmtDate = (d: string) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

/**
 * One notice as a brutalist card. Links out to the official government source
 * (new tab, rel="noopener noreferrer"). `title`/`orgName` render as text so
 * React escapes them — no dangerouslySetInnerHTML. Decorative icons are
 * aria-hidden; the link carries a descriptive aria-label.
 */
export function NoticeCard({ notice }: { notice: Notice }) {
  const { title, orgName, sourceUrl, publishedDate, noticeType } = notice;
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${labelFor(noticeType)}: ${title}. Opens the official source in a new tab.`}
      className="block h-full group focus-visible:outline-3 focus-visible:outline-brutal-purple"
    >
      <div className="card-brutal h-full flex flex-col bg-card p-5 gap-3 group-hover:bg-brutal-yellow/5">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`badge-brutal text-[10px] uppercase ${badgeFor(noticeType)}`}
          >
            {labelFor(noticeType)}
          </span>
          {publishedDate && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
              <LuCalendar className="w-3.5 h-3.5" aria-hidden />{" "}
              {fmtDate(publishedDate)}
            </span>
          )}
        </div>

        <h3 className="font-black text-lg leading-tight uppercase line-clamp-3">
          {title}
        </h3>

        {orgName && (
          <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5 line-clamp-1">
            <LuBuilding2 className="w-4 h-4 shrink-0" aria-hidden /> {orgName}
          </span>
        )}

        <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-black text-brutal-purple">
          View notice{" "}
          <LuExternalLink
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            aria-hidden
          />
        </span>
      </div>
    </a>
  );
}

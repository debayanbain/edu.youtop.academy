"use client";

import React, { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { toJobNews } from "@/lib/content-adapters";
import {
  LuArrowLeft,
  LuCalendar,
  LuExternalLink,
  LuBuilding2,
  LuFileText,
  LuGlobe,
} from "react-icons/lu";

const fmtDate = (d: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

export default function JobNewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data, isPending, isError } = useQuery({
    queryKey: ["job-news-item", slug],
    queryFn: async () => toJobNews(await apiClient.get<unknown>(`/job-news/${slug}`)),
    retry: false,
  });

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border-2 border-border rounded-md bg-card font-bold shadow-[2px_2px_0_0_#000] hover:bg-brutal-yellow/20 transition-colors text-sm"
        >
          <LuArrowLeft className="w-4 h-4" /> Back to news
        </Link>

        {isPending ? (
          <div className="animate-pulse space-y-4">
            <div className="aspect-video bg-muted rounded card-brutal" />
            <div className="h-8 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        ) : isError || !data ? (
          <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
            <h1 className="text-2xl font-black mb-2">Article not found</h1>
            <Link href="/news" className="btn-brutal btn-brutal-purple mt-4 inline-block">
              Browse all news
            </Link>
          </div>
        ) : (
          <article className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-brutal bg-brutal-green text-white text-xs uppercase">
                {data.isPosting ? "Recruitment" : data.category || "Update"}
              </span>
              {data.lastDate ? (
                <span className="badge-brutal bg-brutal-orange/15 text-brutal-orange text-xs font-bold flex items-center gap-1.5">
                  <LuCalendar className="w-4 h-4" /> Last date {fmtDate(data.lastDate)}
                </span>
              ) : (
                data.publishedDate && (
                  <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
                    <LuCalendar className="w-4 h-4" /> {fmtDate(data.publishedDate)}
                  </span>
                )
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
              {data.title}
            </h1>

            {data.organization && (
              <p className="text-lg font-bold text-muted-foreground flex items-center gap-2">
                <LuBuilding2 className="w-5 h-5 shrink-0 text-brutal-purple" /> {data.organization}
              </p>
            )}

            {/* Structured posting details */}
            {(() => {
              const rows: [string, string][] = [
                ["Vacancies", data.vacancies],
                ["Qualification", data.qualification],
                ["Age Limit", data.ageLimit],
                ["Salary", data.salary],
                ["Application Fee", data.applicationFee],
                ["Last Date", data.lastDate ? fmtDate(data.lastDate) : ""],
              ].filter(([, v]) => v) as [string, string][];
              return rows.length ? (
                <div className="card-brutal p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {rows.map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5">
                      <span className="text-[11px] uppercase font-bold text-muted-foreground tracking-wide">
                        {k}
                      </span>
                      <span className="font-black">{v}</span>
                    </div>
                  ))}
                </div>
              ) : null;
            })()}

            {data.eligibility && (
              <section className="space-y-2">
                <h2 className="text-xl font-black uppercase">Eligibility Criteria</h2>
                <p className="text-base font-medium leading-relaxed whitespace-pre-line">
                  {data.eligibility}
                </p>
              </section>
            )}

            {data.summary && !data.eligibility && (
              <p className="text-lg font-bold text-muted-foreground leading-relaxed">
                {data.summary}
              </p>
            )}

            {data.content && (
              <div className="prose max-w-none text-base md:text-lg font-medium text-foreground leading-relaxed whitespace-pre-line">
                {data.content}
              </div>
            )}

            {/* Official links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {data.applyLink && (
                <a
                  href={data.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal btn-brutal-purple inline-flex items-center gap-2"
                >
                  Apply Now <LuExternalLink className="w-4 h-4" />
                </a>
              )}
              {data.notificationLink && (
                <a
                  href={data.notificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal inline-flex items-center gap-2"
                >
                  Notification <LuFileText className="w-4 h-4" />
                </a>
              )}
              {data.officialWebsite && (
                <a
                  href={data.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal inline-flex items-center gap-2"
                >
                  Official Site <LuGlobe className="w-4 h-4" />
                </a>
              )}
              {!data.applyLink &&
                !data.notificationLink &&
                !data.officialWebsite &&
                data.sourceLink && (
                  <a
                    href={data.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal btn-brutal-purple inline-flex items-center gap-2"
                  >
                    Read at source <LuExternalLink className="w-4 h-4" />
                  </a>
                )}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

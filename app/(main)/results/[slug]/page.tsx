"use client";

import React, { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { toJobResult } from "@/lib/content-adapters";
import { safeHref } from "@/lib/safe-href";
import { LuArrowLeft, LuBuilding2, LuCalendar, LuExternalLink, LuFileDown } from "react-icons/lu";

const fmtDate = (d: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

export default function JobResultDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data, isPending, isError } = useQuery({
    queryKey: ["job-result", slug],
    queryFn: async () => toJobResult(await apiClient.get<unknown>(`/job-results/${slug}`)),
    retry: false,
  });

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/results"
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border-2 border-border rounded-md bg-card font-bold shadow-[2px_2px_0_0_#000] hover:bg-brutal-yellow/20 transition-colors text-sm"
        >
          <LuArrowLeft className="w-4 h-4" /> Back to results
        </Link>

        {isPending ? (
          <div className="animate-pulse space-y-4">
            <div className="aspect-video bg-muted rounded card-brutal" />
            <div className="h-8 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        ) : isError || !data ? (
          <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
            <h1 className="text-2xl font-black mb-2">Result not found</h1>
            <Link href="/results" className="btn-brutal btn-brutal-purple mt-4 inline-block">
              Browse all results
            </Link>
          </div>
        ) : (
          <article className="space-y-6">
            <span className="badge-brutal bg-brutal-green text-white text-xs uppercase">
              {data.kind ? data.kind.replace(/-/g, " ") : "result"}
            </span>

            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
              {data.title}
            </h1>

            <div className="flex flex-wrap gap-3 text-sm font-bold text-muted-foreground">
              {data.organization && (
                <span className="flex items-center gap-1.5">
                  <LuBuilding2 className="w-4 h-4" /> {data.organization}
                </span>
              )}
              {data.postName && <span>• {data.postName}</span>}
              {data.resultDate && (
                <span className="flex items-center gap-1.5">
                  <LuCalendar className="w-4 h-4" /> {fmtDate(data.resultDate)}
                </span>
              )}
            </div>

            {data.description && (
              <p className="text-base md:text-lg font-medium text-foreground leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {safeHref(data.officialLink) && (
                <a
                  href={safeHref(data.officialLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal btn-brutal-purple inline-flex items-center gap-2"
                >
                  Check Result <LuExternalLink className="w-4 h-4" />
                </a>
              )}
              {safeHref(data.pdfUrl) && (
                <a
                  href={safeHref(data.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal btn-brutal-outline inline-flex items-center gap-2"
                >
                  Download PDF <LuFileDown className="w-4 h-4" />
                </a>
              )}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

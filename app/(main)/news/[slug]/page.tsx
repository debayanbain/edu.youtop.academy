"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { toJobNews } from "@/lib/content-adapters";
import { LuArrowLeft, LuCalendar, LuExternalLink } from "react-icons/lu";

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
            <div className="card-brutal overflow-hidden border-3">
              <div className="aspect-video bg-muted relative">
                <Image src={data.image} alt={data.title} fill className="object-cover" priority />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {data.category && (
                <span className="badge-brutal bg-brutal-yellow text-brutal-dark text-xs uppercase">
                  {data.category}
                </span>
              )}
              {data.publishedDate && (
                <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
                  <LuCalendar className="w-4 h-4" /> {fmtDate(data.publishedDate)}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
              {data.title}
            </h1>

            {data.summary && (
              <p className="text-lg font-bold text-muted-foreground leading-relaxed">
                {data.summary}
              </p>
            )}

            {data.content && (
              <div className="prose max-w-none text-base md:text-lg font-medium text-foreground leading-relaxed whitespace-pre-line">
                {data.content}
              </div>
            )}

            {data.sourceLink && (
              <a
                href={data.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-purple inline-flex items-center gap-2"
              >
                Read at source <LuExternalLink className="w-4 h-4" />
              </a>
            )}
          </article>
        )}
      </div>
    </div>
  );
}

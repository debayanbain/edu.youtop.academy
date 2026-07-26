"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchJobNews } from "@/lib/content-adapters";
import { LuArrowRight, LuCalendar, LuBuilding2, LuUsers } from "react-icons/lu";

const fmtDate = (d: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

export default function NewsPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["job-news"],
    queryFn: fetchJobNews,
  });
  const items = data ?? [];

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="badge-brutal bg-brutal-green text-white text-xs">JOB NEWS</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-black uppercase tracking-tight">
            Job <span className="text-brutal-purple">Postings</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-medium">
            Latest government job openings — posts, eligibility, and official apply links.
          </p>
        </div>

        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-brutal h-full overflow-hidden animate-pulse">
                <div className="aspect-4/3 border-b-3 border-border bg-muted" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
            <h2 className="text-2xl font-black mb-2">Couldn&apos;t load news</h2>
            <p className="text-muted-foreground font-medium">
              Please check your connection and try again.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
            <h2 className="text-2xl font-black mb-2">No postings yet</h2>
            <p className="text-muted-foreground font-medium">
              Check back soon — fresh recruitment postings land here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((n) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="block h-full group">
                <div className="card-brutal h-full flex flex-col bg-card p-5 gap-3 group-hover:bg-brutal-yellow/5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge-brutal bg-brutal-green text-white text-[10px] uppercase">
                      Recruitment
                    </span>
                    {n.vacancies && (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-brutal-purple">
                        <LuUsers className="w-3.5 h-3.5" /> {n.vacancies}
                        {/^\d/.test(n.vacancies) ? " posts" : ""}
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-lg leading-tight uppercase line-clamp-3">
                    {n.title}
                  </h3>
                  {n.organization && (
                    <p className="text-sm font-bold text-muted-foreground line-clamp-1 flex items-center gap-1.5">
                      <LuBuilding2 className="w-4 h-4 shrink-0" /> {n.organization}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {n.lastDate && (
                      <span className="badge-brutal bg-brutal-orange/15 text-brutal-orange text-[11px] font-bold inline-flex items-center gap-1">
                        <LuCalendar className="w-3.5 h-3.5" /> Last date {fmtDate(n.lastDate)}
                      </span>
                    )}
                    {n.qualification && (
                      <span className="badge-brutal bg-muted text-[11px] font-bold line-clamp-1 max-w-[12rem]">
                        {n.qualification}
                      </span>
                    )}
                  </div>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-black text-brutal-purple">
                    View details <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

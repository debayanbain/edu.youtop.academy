"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchJobResults } from "@/lib/content-adapters";
import { LuArrowRight, LuBuilding2, LuCalendar } from "react-icons/lu";

const fmtDate = (d: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

const kindLabel = (k: string) => (k ? k.replace(/-/g, " ").toUpperCase() : "RESULT");
const kindColor = (k: string) =>
  k === "admit-card" || k === "answer-key"
    ? "bg-brutal-purple text-white"
    : k === "notification" || k === "counseling"
      ? "bg-brutal-orange text-white"
      : "bg-brutal-green text-white";

export default function ResultsPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["job-results"],
    queryFn: fetchJobResults,
  });
  const items = data ?? [];

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="badge-brutal bg-brutal-yellow text-brutal-dark text-xs">
            LATEST RESULTS
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-black uppercase tracking-tight">
            Job <span className="text-brutal-purple">Results</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-medium">
            Latest exam and recruitment results, updated regularly.
          </p>
        </div>

        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-brutal h-full overflow-hidden animate-pulse">
                <div className="aspect-4/3 border-b-3 border-border bg-muted" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
            <h2 className="text-2xl font-black mb-2">Couldn&apos;t load results</h2>
            <p className="text-muted-foreground font-medium">
              Please check your connection and try again.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
            <h2 className="text-2xl font-black mb-2">No results yet</h2>
            <p className="text-muted-foreground font-medium">
              Check back soon — new results are posted here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((r) => (
              <Link key={r.id} href={`/results/${r.slug}`} className="block h-full group">
                <div className="card-brutal h-full flex flex-col bg-card p-5 gap-3 group-hover:bg-brutal-yellow/5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`badge-brutal text-[10px] uppercase ${kindColor(r.kind)}`}>
                      {kindLabel(r.kind)}
                    </span>
                    {r.resultDate && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                        <LuCalendar className="w-3.5 h-3.5" /> {fmtDate(r.resultDate)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-lg leading-tight uppercase line-clamp-3">
                    {r.title}
                  </h3>
                  {r.organization && (
                    <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                      <LuBuilding2 className="w-4 h-4 shrink-0" /> {r.organization}
                    </span>
                  )}
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

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchJobNews } from "@/lib/content-adapters";
import { LuArrowRight, LuCalendar } from "react-icons/lu";

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
            Job <span className="text-brutal-purple">News</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-medium">
            Exam notices, recruitment drives, and important updates.
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
            <h2 className="text-2xl font-black mb-2">No news yet</h2>
            <p className="text-muted-foreground font-medium">
              Check back soon — the latest job news lands here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((n) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="block h-full group">
                <div className="card-brutal h-full flex flex-col bg-card overflow-hidden group-hover:bg-brutal-yellow/5">
                  <div className="aspect-4/3 border-b-3 border-border bg-muted relative overflow-hidden">
                    <Image
                      src={n.image}
                      alt={n.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    {n.category && (
                      <span className="absolute top-2 left-2 badge-brutal bg-brutal-yellow text-brutal-dark text-[10px] uppercase">
                        {n.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 gap-2">
                    <h3 className="font-black text-lg leading-tight uppercase line-clamp-2">
                      {n.title}
                    </h3>
                    {n.summary && (
                      <p className="text-sm text-muted-foreground font-medium line-clamp-2">
                        {n.summary}
                      </p>
                    )}
                    {n.publishedDate && (
                      <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                        <LuCalendar className="w-3.5 h-3.5" /> {fmtDate(n.publishedDate)}
                      </span>
                    )}
                    <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-black text-brutal-purple">
                      Read more <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

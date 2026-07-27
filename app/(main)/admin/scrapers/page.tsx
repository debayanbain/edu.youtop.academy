"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api";
import { LuRefreshCw, LuCircleCheck, LuCircleX, LuLoader } from "react-icons/lu";

interface ScrapeJob {
  id: number;
  source: string;
  status: "running" | "success" | "error";
  itemsFound: number;
  itemsInserted: number;
  itemsSkipped: number;
  durationMs: number | null;
  error: string | null;
  createdAt: string;
}

const fmtWhen = (d: string) =>
  d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "";

const statusIcon = (s: string) =>
  s === "success" ? <LuCircleCheck className="w-4 h-4 text-brutal-green" /> : s === "error" ? <LuCircleX className="w-4 h-4 text-red-600" /> : <LuLoader className="w-4 h-4 animate-spin" />;

export default function ScraperAdminPage() {
  const { getToken, isLoaded } = useAuth();

  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ["scrape-jobs"],
    enabled: isLoaded,
    queryFn: async () => {
      const token = await getToken();
      return apiClient.get<ScrapeJob[]>("/admin/scrape/jobs", token ?? undefined);
    },
    refetchInterval: 15000,
  });

  const jobs = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="badge-brutal bg-brutal-purple text-white text-xs">ADMIN</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-black uppercase tracking-tight">
              Scraper <span className="text-brutal-purple">Runs</span>
            </h1>
          </div>
          <button onClick={() => refetch()} className="btn-brutal btn-brutal-sm inline-flex items-center gap-2">
            <LuRefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {isPending ? (
          <div className="card-brutal p-8 text-center font-bold text-muted-foreground">Loading…</div>
        ) : isError ? (
          <div className="card-brutal p-8 text-center bg-muted/50 border-dashed">
            <h2 className="text-xl font-black mb-2">Admin access required</h2>
            <p className="text-muted-foreground font-medium">Sign in with an admin account to view scraper runs.</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="card-brutal p-8 text-center bg-muted/50 border-dashed">
            <h2 className="text-xl font-black mb-2">No runs yet</h2>
            <p className="text-muted-foreground font-medium">Trigger a scrape or enable the schedule.</p>
          </div>
        ) : (
          <div className="card-brutal overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border text-left uppercase text-[11px] text-muted-foreground">
                  <th className="p-3">Source</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">New</th>
                  <th className="p-3 text-right">Skipped</th>
                  <th className="p-3 text-right">Took</th>
                  <th className="p-3">When</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id} className="border-b border-border/50 font-medium">
                    <td className="p-3 font-bold">{j.source}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5">{statusIcon(j.status)} {j.status}</span>
                    </td>
                    <td className="p-3 text-right font-black">{j.itemsInserted}</td>
                    <td className="p-3 text-right text-muted-foreground">{j.itemsSkipped}</td>
                    <td className="p-3 text-right text-muted-foreground">{j.durationMs != null ? `${(j.durationMs / 1000).toFixed(1)}s` : "—"}</td>
                    <td className="p-3 text-muted-foreground">
                      {fmtWhen(j.createdAt)}
                      {j.error && <span className="block text-[11px] text-red-600 line-clamp-1">{j.error}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

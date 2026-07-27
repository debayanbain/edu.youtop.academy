"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  LuSearch,
  LuX,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { fetchNotices } from "@/lib/content-adapters";
import { NoticeCard } from "./notice-card";
import { NOTICE_TYPE_ORDER, NOTICE_TYPE_META } from "./notice-meta";

const PAGE_SIZE = 24;

/**
 * The powerful, deeply-usable notice board (spec follow-up): free-text search
 * (title + org) + category filter chips + pagination, all against the public
 * GET /notices endpoint. One component drives /notices and every
 * /notices/[type] deep link. Search is debounced; page resets on filter change;
 * previous results stay visible during refetch (no flicker).
 */
export function NoticeBoard({
  initialType = "",
  heading = "Government Notices",
  subtitle = "Jobs, results, admit cards, answer keys, scholarships and more — aggregated from official sources and news. Search or filter to dig in.",
}: {
  initialType?: string;
  heading?: string;
  subtitle?: string;
}) {
  const [type, setType] = useState(initialType);
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  // Debounce the search box.
  useEffect(() => {
    const t = setTimeout(() => setQ(qInput.trim()), 350);
    return () => clearTimeout(t);
  }, [qInput]);

  // Any filter change returns to page 1.
  useEffect(() => {
    setPage(1);
  }, [q, type]);

  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: ["notices-board", type, q, page],
    queryFn: () =>
      fetchNotices({
        type: type || undefined,
        q: q || undefined,
        page,
        limit: PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const chips = useMemo(
    () => [
      { type: "", label: "ALL" },
      ...NOTICE_TYPE_ORDER.map((t) => ({
        type: t,
        label: NOTICE_TYPE_META[t].label,
      })),
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <span className="badge-brutal bg-brutal-yellow text-brutal-dark text-xs">
            NOTICE BOARD
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-black uppercase tracking-tight">
            {heading}
          </h1>
          <p className="mt-2 text-muted-foreground font-medium max-w-3xl">
            {subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <label htmlFor="notice-search" className="sr-only">
            Search notices
          </label>
          <div className="relative">
            <LuSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              aria-hidden
            />
            <input
              id="notice-search"
              type="search"
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder="Search by title or organisation (e.g. SSC, UPSC, railway, scholarship)…"
              className="w-full h-12 pl-12 pr-12 border-3 border-brutal-dark bg-card font-bold text-base placeholder:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0_0_var(--brutal-dark)] transition-shadow"
            />
            {qInput && (
              <button
                type="button"
                onClick={() => setQInput("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center hover:bg-muted"
              >
                <LuX className="w-5 h-5" aria-hidden />
              </button>
            )}
          </div>
        </div>

        {/* Category chips */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1"
          role="group"
          aria-label="Filter by category"
        >
          {chips.map((c) => {
            const active = c.type === type;
            return (
              <button
                key={c.type || "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setType(c.type)}
                className={`shrink-0 h-10 px-4 border-3 border-brutal-dark font-black text-xs uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-brutal-purple text-white"
                    : "bg-card text-foreground hover:bg-brutal-yellow/15"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <div className="mb-4 text-sm font-bold text-muted-foreground" aria-live="polite">
          {isPending
            ? "Loading…"
            : isError
              ? ""
              : `${total.toLocaleString("en-IN")} notice${total === 1 ? "" : "s"}${
                  q ? ` matching “${q}”` : ""
                }`}
        </div>

        {/* Results */}
        {isPending ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            aria-busy="true"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="card-brutal h-40 overflow-hidden animate-pulse bg-muted/40"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
            <h2 className="text-2xl font-black mb-2">Couldn&apos;t load notices</h2>
            <p className="text-muted-foreground font-medium">
              Please check your connection and try again.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="card-brutal p-8 sm:p-12 text-center bg-muted/50 border-dashed">
            <h2 className="text-2xl font-black mb-2">No matching notices</h2>
            <p className="text-muted-foreground font-medium">
              Try a different keyword or clear the filters.
            </p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-opacity ${
              isFetching ? "opacity-60" : "opacity-100"
            }`}
          >
            {items.map((n) => (
              <NoticeCard key={n.id} notice={n} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isPending && !isError && totalPages > 1 && (
          <nav
            className="mt-8 flex items-center justify-center gap-3"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              aria-label="Previous page"
              className="h-11 px-4 inline-flex items-center gap-1 border-3 border-brutal-dark bg-card font-black text-sm uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-brutal-yellow/15"
            >
              <LuChevronLeft className="w-4 h-4" aria-hidden /> Prev
            </button>
            <span className="font-black text-sm tabular-nums">
              Page {page} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              aria-label="Next page"
              className="h-11 px-4 inline-flex items-center gap-1 border-3 border-brutal-dark bg-card font-black text-sm uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-brutal-yellow/15"
            >
              Next <LuChevronRight className="w-4 h-4" aria-hidden />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}

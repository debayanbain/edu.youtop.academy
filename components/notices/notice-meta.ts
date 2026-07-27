/**
 * Single source of truth for how each notice_type is presented on the notice
 * board — one map instead of nine bespoke pages (mirrors the backend's single
 * enum). Colors reuse the existing brutalist tokens; families share a hue
 * (results/merit/cutoff = purple, job/admission = green) so the board reads as
 * one system.
 */

export interface NoticeTypeMeta {
  /** enum value used by the API (?type=) */
  type: string;
  /** hyphenated URL slug (/notices/admit-card) */
  slug: string;
  label: string;
  /** longer heading for the list page */
  heading: string;
  /** brutalist badge classes (bg + readable text) */
  badge: string;
}

export const NOTICE_TYPE_META: Record<string, NoticeTypeMeta> = {
  job: {
    type: "job",
    slug: "job",
    label: "JOB",
    heading: "Jobs",
    badge: "bg-brutal-green text-white",
  },
  result: {
    type: "result",
    slug: "result",
    label: "RESULT",
    heading: "Results",
    badge: "bg-brutal-purple text-white",
  },
  admit_card: {
    type: "admit_card",
    slug: "admit-card",
    label: "ADMIT CARD",
    heading: "Admit Cards",
    badge: "bg-brutal-orange text-white",
  },
  answer_key: {
    type: "answer_key",
    slug: "answer-key",
    label: "ANSWER KEY",
    heading: "Answer Keys",
    badge: "bg-brutal-pink text-white",
  },
  notification: {
    type: "notification",
    slug: "notification",
    label: "NOTIFICATION",
    heading: "Notifications",
    badge: "bg-brutal-dark text-white",
  },
  scholarship: {
    type: "scholarship",
    slug: "scholarship",
    label: "SCHOLARSHIP",
    heading: "Scholarships",
    badge: "bg-brutal-yellow text-brutal-dark",
  },
  admission: {
    type: "admission",
    slug: "admission",
    label: "ADMISSION",
    heading: "Admissions",
    badge: "bg-brutal-green text-white",
  },
  cutoff: {
    type: "cutoff",
    slug: "cutoff",
    label: "CUTOFF",
    heading: "Cut Offs",
    badge: "bg-brutal-purple text-white",
  },
  merit_list: {
    type: "merit_list",
    slug: "merit-list",
    label: "MERIT LIST",
    heading: "Merit Lists",
    badge: "bg-brutal-purple text-white",
  },
};

/** Ordered list for nav/index rendering. */
export const NOTICE_TYPE_ORDER = [
  "job",
  "result",
  "admit_card",
  "answer_key",
  "notification",
  "scholarship",
  "admission",
  "cutoff",
  "merit_list",
] as const;

const BY_SLUG: Record<string, NoticeTypeMeta> = Object.fromEntries(
  Object.values(NOTICE_TYPE_META).map((m) => [m.slug, m]),
);

export const metaForType = (type: string): NoticeTypeMeta | undefined =>
  NOTICE_TYPE_META[type];

export const metaForSlug = (slug: string): NoticeTypeMeta | undefined =>
  BY_SLUG[slug];

const FALLBACK: NoticeTypeMeta = NOTICE_TYPE_META.notification;

export const badgeFor = (type: string): string =>
  (NOTICE_TYPE_META[type] ?? FALLBACK).badge;

export const labelFor = (type: string): string =>
  (NOTICE_TYPE_META[type] ?? FALLBACK).label;

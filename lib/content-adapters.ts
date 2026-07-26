import { apiClient } from "./api";
import { PLACEHOLDER_IMAGE } from "./product-adapter";
import type { Scholarship } from "@/data/scholarships-data";

const str = (v: unknown, f = ""): string => (v == null ? f : String(v));
const img = (v: unknown): string =>
  typeof v === "string" && v ? v : PLACEHOLDER_IMAGE;
const arr = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => String(x)) : [];

/* ------------------------------- Job Results ------------------------------ */

export interface JobResult {
  id: string;
  title: string;
  slug: string;
  organization: string;
  postName: string;
  resultDate: string;
  description: string;
  officialLink: string;
  pdfUrl: string | null;
  image: string;
  sourceType: string;
}

function normJobResult(p: Record<string, unknown>): JobResult {
  return {
    id: str(p.id),
    title: str(p.title, "Untitled"),
    slug: str(p.slug),
    organization: str(p.organization),
    postName: str(p.postName),
    resultDate: str(p.resultDate),
    description: str(p.description),
    officialLink: str(p.officialLink),
    pdfUrl: typeof p.pdfUrl === "string" && p.pdfUrl ? p.pdfUrl : null,
    image: img(p.image),
    sourceType: str(p.sourceType, "manual"),
  };
}

export const toJobResults = (d: unknown): JobResult[] =>
  Array.isArray(d) ? d.map((x) => normJobResult(x as Record<string, unknown>)) : [];
export const toJobResult = (d: unknown): JobResult | null =>
  d && typeof d === "object" && !Array.isArray(d)
    ? normJobResult(d as Record<string, unknown>)
    : null;
export const fetchJobResults = async (): Promise<JobResult[]> =>
  toJobResults(await apiClient.get<unknown>("/job-results"));

/* -------------------------------- Job News -------------------------------- */

export interface JobNews {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedDate: string;
  sourceLink: string;
  category: string;
  image: string;
  sourceType: string;
  // Vacancy-posting fields (present when isPosting is true).
  isPosting: boolean;
  organization: string;
  vacancies: string;
  qualification: string;
  eligibility: string;
  ageLimit: string;
  salary: string;
  applicationFee: string;
  lastDate: string;
  applyLink: string;
  notificationLink: string;
  officialWebsite: string;
}

function normJobNews(p: Record<string, unknown>): JobNews {
  return {
    id: str(p.id),
    title: str(p.title, "Untitled"),
    slug: str(p.slug),
    summary: str(p.summary),
    content: str(p.content),
    publishedDate: str(p.publishedDate),
    sourceLink: str(p.sourceLink),
    category: str(p.category),
    image: img(p.image),
    sourceType: str(p.sourceType, "manual"),
    isPosting: !!p.isPosting,
    organization: str(p.organization),
    vacancies: str(p.vacancies),
    qualification: str(p.qualification),
    eligibility: str(p.eligibility),
    ageLimit: str(p.ageLimit),
    salary: str(p.salary),
    applicationFee: str(p.applicationFee),
    lastDate: str(p.lastDate),
    applyLink: str(p.applyLink),
    notificationLink: str(p.notificationLink),
    officialWebsite: str(p.officialWebsite),
  };
}

export const toJobNewsList = (d: unknown): JobNews[] =>
  Array.isArray(d) ? d.map((x) => normJobNews(x as Record<string, unknown>)) : [];
export const toJobNews = (d: unknown): JobNews | null =>
  d && typeof d === "object" && !Array.isArray(d)
    ? normJobNews(d as Record<string, unknown>)
    : null;
export const fetchJobNews = async (): Promise<JobNews[]> =>
  toJobNewsList(await apiClient.get<unknown>("/job-news"));

/* ------------------------------ Scholarships ------------------------------ */
/* Maps the backend payload onto the existing card's `Scholarship` shape. */

function normScholarship(p: Record<string, unknown>): Scholarship {
  return {
    id: str(p.id),
    slug: str(p.slug),
    title: str(p.title, "Untitled"),
    description: str(p.description),
    provider: str(p.provider),
    logo: img(p.logo),
    amount: str(p.amount),
    awardDetails: str(p.awardDetails),
    eligibilitySummary: str(p.eligibilitySummary),
    deadline: str(p.deadline),
    daysRemaining:
      typeof p.daysRemaining === "number" ? p.daysRemaining : undefined,
    type: (str(p.type, "National") as Scholarship["type"]),
    state: (p.state as Scholarship["state"]) ?? undefined,
    category: (str(p.category, "Indian") as Scholarship["category"]),
    status: (str(p.status, "Live") as Scholarship["status"]),
    domain: p.domain ? str(p.domain) : undefined,
    eligibility: arr(p.eligibility),
    benefits: arr(p.benefits),
    applicationLink: str(p.applicationLink),
    featured: !!p.featured,
  };
}

export const toScholarships = (d: unknown): Scholarship[] =>
  Array.isArray(d)
    ? d.map((x) => normScholarship(x as Record<string, unknown>))
    : [];
export const toScholarship = (d: unknown): Scholarship | null =>
  d && typeof d === "object" && !Array.isArray(d)
    ? normScholarship(d as Record<string, unknown>)
    : null;
export const fetchScholarships = async (token?: string): Promise<Scholarship[]> =>
  toScholarships(await apiClient.get<unknown>("/scholarships", token));
export const fetchScholarship = async (
  slug: string,
  token?: string,
): Promise<Scholarship | null> =>
  toScholarship(await apiClient.get<unknown>(`/scholarships/${slug}`, token));

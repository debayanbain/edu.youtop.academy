import { Note } from "./data/notes";
import { Book } from "./types";

/**
 * Shape returned by the NestJS product-backed endpoints
 * (/ebooks, /notes, /courses — all served from Strapi `products-manage`).
 * Every field is optional/nullable on purpose: the CMS model is smaller than
 * the UI shape, so we defensively default anything that is missing.
 */
export interface ServerProduct {
  id: number | string;
  title?: string | null;
  slug?: string | null;
  type?: string | null;
  class?: number | string | null;
  subject?: string | null;
  author?: string | null;
  description?: string | null;
  price?: number | string | null;
  originalPrice?: number | string | null;
  discountedPrice?: number | string | null;
  tag?: string | null;
  imageLink?: string | null;
  thumbnail?: { url?: string | null } | null;
  isBestSeller?: boolean | null;
  isFeatured?: boolean | null;
  isOwned?: boolean | null;
}

const toNum = (v: unknown, fallback = 0): number => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const toStr = (v: unknown, fallback = ""): string =>
  v === null || v === undefined ? fallback : String(v);

/**
 * Neutral inline-SVG placeholder used when a product has no thumbnail.
 * Guarantees image fields are never an empty string, which makes `next/image`
 * throw ("empty string passed to src") and its optimizer return 400.
 */
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#e5e7eb"/>' +
      '<circle cx="155" cy="120" r="20" fill="#cbd5e1"/>' +
      '<path d="M110 210l55-70 40 48 30-32 55 54z" fill="#cbd5e1"/>' +
      "</svg>",
  );

const imageOf = (p: ServerProduct): string => {
  const url = toStr(p.imageLink ?? p.thumbnail?.url ?? "");
  return url || PLACEHOLDER_IMAGE;
};

/**
 * Backend product -> frontend `Book`. Guarantees every field the UI reads
 * exists with the correct type, so components can never crash on shape drift.
 */
export function normalizeBook(p: ServerProduct): Book {
  const price = toNum(p.price);
  return {
    id: toNum(p.id),
    title: toStr(p.title, "Untitled"),
    author: toStr(p.author, "YouTOP Academy"),
    price,
    originalPrice: toNum(p.originalPrice, price),
    tag: toStr(p.tag, p.isBestSeller ? "Best Seller" : ""),
    coverColor: "bg-brutal-purple",
    imageLink: imageOf(p),
    class: toStr(p.class),
    subject: toStr(p.subject),
    description: toStr(p.description),
    isOwned: Boolean(p.isOwned),
  };
}

/**
 * Backend product -> frontend `Note`. Same guarantees as `normalizeBook`.
 * Note `id` is coerced to string because the UI uses string operations on it.
 */
export function normalizeNote(p: ServerProduct): Note {
  const price = toNum(p.price);
  return {
    id: toStr(p.id),
    title: toStr(p.title, "Untitled"),
    class: toStr(p.class),
    subject: toStr(p.subject),
    price,
    originalPrice: toNum(p.originalPrice, price),
    author: toStr(p.author, "YouTOP Academy"),
    pages: 0,
    coverImage: imageOf(p),
    description: toStr(p.description),
    features: [],
  };
}

/** Map a raw API payload (possibly non-array) to normalized Books, safely. */
export const toBooks = (data: unknown): Book[] =>
  (Array.isArray(data) ? (data as ServerProduct[]) : []).map(normalizeBook);

/** Map a raw API payload (possibly non-array) to normalized Notes, safely. */
export const toNotes = (data: unknown): Note[] =>
  (Array.isArray(data) ? (data as ServerProduct[]) : []).map(normalizeNote);

/** Map a single raw API payload to a normalized Note, or null if unusable. */
export const toNote = (data: unknown): Note | null =>
  data && typeof data === "object" && !Array.isArray(data)
    ? normalizeNote(data as ServerProduct)
    : null;

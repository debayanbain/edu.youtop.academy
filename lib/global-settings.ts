import { apiClient } from "./api";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface GlobalSettings {
  siteName: string;
  logo: string | null;
  favicon: string | null;
  socialLinks: SocialLink[];
  headerLinks: NavLink[];
  footerColumns: FooterColumn[];
}

/** Safe default so the header/footer render even before/without settings. */
export const EMPTY_GLOBAL_SETTINGS: GlobalSettings = {
  siteName: "",
  logo: null,
  favicon: null,
  socialLinks: [],
  headerLinks: [],
  footerColumns: [],
};

function toNavLinks(value: unknown): NavLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (l): l is { label: unknown; href: string } =>
        !!l &&
        typeof (l as { href?: unknown }).href === "string" &&
        !!(l as { href: string }).href,
    )
    .map((l) => ({ label: String((l as { label?: unknown }).label ?? ""), href: String(l.href) }));
}

/** Normalize the backend payload, defaulting anything missing/malformed. */
export function toGlobalSettings(data: unknown): GlobalSettings {
  const d = (data && typeof data === "object" ? data : {}) as Record<
    string,
    unknown
  >;
  const links = Array.isArray(d.socialLinks) ? d.socialLinks : [];
  const columns = Array.isArray(d.footerColumns) ? d.footerColumns : [];
  return {
    siteName: typeof d.siteName === "string" ? d.siteName : "",
    logo: typeof d.logo === "string" && d.logo ? d.logo : null,
    favicon: typeof d.favicon === "string" && d.favicon ? d.favicon : null,
    socialLinks: links
      .filter(
        (s): s is { platform?: unknown; url: string } =>
          !!s && typeof (s as { url?: unknown }).url === "string" && !!(s as { url: string }).url,
      )
      .map((s) => ({
        platform: String((s as { platform?: unknown }).platform ?? ""),
        url: String(s.url),
      })),
    headerLinks: toNavLinks(d.headerLinks),
    footerColumns: columns
      .filter(
        (c): c is { title: unknown; links?: unknown } =>
          !!c && typeof (c as { title?: unknown }).title === "string",
      )
      .map((c) => ({
        title: String((c as { title: unknown }).title),
        links: toNavLinks((c as { links?: unknown }).links),
      })),
  };
}

export async function fetchGlobalSettings(): Promise<GlobalSettings> {
  const data = await apiClient.get<unknown>("/global-settings");
  return toGlobalSettings(data);
}

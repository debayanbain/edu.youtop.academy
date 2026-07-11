"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchGlobalSettings,
  EMPTY_GLOBAL_SETTINGS,
  GlobalSettings,
} from "@/lib/global-settings";

/**
 * Site-wide settings (name, logo, favicon, social links) from Strapi via the
 * NestJS backend. Always returns a well-formed object — falls back to empty
 * defaults while loading or if the request fails — so consumers never null-check.
 */
export function useGlobalSettings(): GlobalSettings {
  const { data } = useQuery({
    queryKey: ["global-settings"],
    queryFn: fetchGlobalSettings,
    staleTime: 1000 * 60 * 60, // 1h — settings change rarely
  });
  return data ?? EMPTY_GLOBAL_SETTINGS;
}

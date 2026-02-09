import { getAllPages, getPageBySlug, type Page } from "@/data/pages";
import { useMemo } from "react";

export function usePages(): { data: Page[]; isLoading: false; error: null } {
  const data = useMemo(() => getAllPages(), []);
  return { data, isLoading: false, error: null };
}

export function usePage(slug: string): { data: Page | null; isLoading: false; error: null } {
  const data = useMemo(() => getPageBySlug(slug) || null, [slug]);
  return { data, isLoading: false, error: null };
}

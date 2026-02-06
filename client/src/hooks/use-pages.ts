import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function usePages() {
  return useQuery({
    queryKey: [api.pages.list.path],
    queryFn: async () => {
      const res = await fetch(api.pages.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch pages");
      return api.pages.list.responses[200].parse(await res.json());
    },
  });
}

export function usePage(slug: string) {
  return useQuery({
    queryKey: [api.pages.getBySlug.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.pages.getBySlug.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch page");
      
      return api.pages.getBySlug.responses[200].parse(await res.json());
    },
    // Don't retry on 404s
    retry: (failureCount, error: any) => {
      if (error?.message?.includes('404')) return false;
      return failureCount < 3;
    }
  });
}

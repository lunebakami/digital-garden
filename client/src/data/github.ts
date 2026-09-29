export const GITHUB_USERNAME = "lunebakami";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export const LANGUAGE_COLORS: Record<string, string> = {
  Rust: "#dea584",
  Go: "#00add8",
  Python: "#3572a5",
  TypeScript: "#3178c6",
  Zig: "#ec915c",
  PHP: "#4f5d95",
};

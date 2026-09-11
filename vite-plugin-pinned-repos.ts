import type { Plugin } from "vite";
import { GITHUB_USERNAME, LANGUAGE_COLORS, type Repo } from "./client/src/data/github";

const VIRTUAL_ID = "virtual:github-repos";
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`;

const PINNED_REPOS_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

const EXTRA_REPOS: Array<{ name: string; description?: string }> = [
  { name: "lunnet", description: "WiFi TUI made in Rust" },
  { name: "holdotfiles-go", description: "Config file backup CLI written in Go" },
  {
    name: "bytenana",
    description: "GeoDjango app ingesting Hays County parcels and City of Buda zoning into PostGIS",
  },
];

function getGithubToken(): string | undefined {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
}

function toRepo(details: {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}): Repo {
  return {
    name: details.name,
    description: details.description,
    url: details.html_url,
    homepageUrl: details.homepage,
    stargazerCount: details.stargazers_count,
    forkCount: details.forks_count,
    primaryLanguage: details.language
      ? { name: details.language, color: LANGUAGE_COLORS[details.language] ?? "#ffffff" }
      : null,
  };
}

async function fetchPinnedViaGraphQL(token: string): Promise<Repo[] | null> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "digital-garden-portfolio",
    },
    body: JSON.stringify({
      query: PINNED_REPOS_QUERY,
      variables: { login: GITHUB_USERNAME },
    }),
  });

  if (!response.ok) {
    console.warn(`[github-repos] GraphQL failed: ${response.status} ${response.statusText}`);
    return null;
  }

  const payload = (await response.json()) as {
    data?: {
      user?: {
        pinnedItems?: {
          nodes?: Array<Repo | null>;
        };
      };
    };
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    console.warn(`[github-repos] GraphQL errors: ${payload.errors.map((error) => error.message).join("; ")}`);
    return null;
  }

  return (payload.data?.user?.pinnedItems?.nodes ?? []).filter((node): node is Repo => Boolean(node?.name));
}

function parsePinnedFromProfileHtml(html: string): Repo[] {
  const items = html.match(/class="[^"]*pinned-item-list-item[\s\S]*?<\/li>/g) ?? [];

  return items
    .map((item) => {
      const name = item.match(/<span class="repo">([^<]+)<\/span>/)?.[1]?.trim();
      if (!name) {
        return null;
      }

      const rawDescription = item.match(/pinned-item-desc[^>]*>([\s\S]*?)<\/p>/)?.[1]?.trim();
      const languageName = item.match(/itemprop="programmingLanguage">([^<]+)/)?.[1]?.trim();
      const languageColor = item.match(/background-color:\s*([^;"]+)/)?.[1]?.trim();

      const repo: Repo = {
        name,
        description: rawDescription || null,
        url: `https://github.com/${GITHUB_USERNAME}/${name}`,
        homepageUrl: null,
        stargazerCount: 0,
        forkCount: 0,
        primaryLanguage: languageName
          ? {
              name: languageName,
              color: languageColor || (LANGUAGE_COLORS[languageName] ?? "#ffffff"),
            }
          : null,
      };

      return repo;
    })
    .filter((repo): repo is Repo => repo !== null);
}

async function enrichReposFromRest(repos: Repo[]): Promise<Repo[]> {
  return Promise.all(
    repos.map(async (repo) => {
      try {
        const details = await fetchRepoFromRest(repo.name);
        return details ? { ...repo, ...details } : repo;
      } catch {
        return repo;
      }
    }),
  );
}

async function fetchRepoFromRest(name: string, fallbackDescription?: string): Promise<Repo | null> {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "digital-garden-portfolio",
    },
  });

  if (!response.ok) {
    return null;
  }

  const details = (await response.json()) as {
    name: string;
    description?: string | null;
    html_url?: string;
    homepage?: string | null;
    stargazers_count?: number;
    forks_count?: number;
    language?: string | null;
  };

  return toRepo({
    name: details.name ?? name,
    description: details.description ?? fallbackDescription ?? null,
    html_url: details.html_url ?? `https://github.com/${GITHUB_USERNAME}/${name}`,
    homepage: details.homepage ?? null,
    stargazers_count: details.stargazers_count ?? 0,
    forks_count: details.forks_count ?? 0,
    language: details.language ?? null,
  });
}

async function fetchPinnedViaProfileHtml(): Promise<Repo[] | null> {
  const response = await fetch(`https://github.com/${GITHUB_USERNAME}`, {
    headers: {
      "User-Agent": "digital-garden-portfolio",
      Accept: "text/html",
    },
  });

  if (!response.ok) {
    console.warn(`[github-repos] Profile scrape failed: ${response.status} ${response.statusText}`);
    return null;
  }

  const html = await response.text();
  const parsed = parsePinnedFromProfileHtml(html);

  if (parsed.length === 0) {
    console.warn("[github-repos] Profile scrape found no pinned repositories");
    return null;
  }

  return enrichReposFromRest(parsed);
}

async function loadPinnedRepos(): Promise<Repo[]> {
  const token = getGithubToken();

  if (token) {
    const fromGraphql = await fetchPinnedViaGraphQL(token);
    if (fromGraphql) {
      return fromGraphql;
    }
  }

  const fromHtml = await fetchPinnedViaProfileHtml();
  return fromHtml ?? [];
}

async function loadExtraRepos(): Promise<Repo[]> {
  const repos = await Promise.all(
    EXTRA_REPOS.map((extra) => fetchRepoFromRest(extra.name, extra.description)),
  );
  return repos.filter((repo): repo is Repo => repo !== null);
}

async function loadRepos(): Promise<Repo[]> {
  const [pinned, extras] = await Promise.all([loadPinnedRepos(), loadExtraRepos()]);
  const seen = new Set<string>();
  return [...pinned, ...extras].filter((repo) => {
    if (seen.has(repo.name)) {
      return false;
    }
    seen.add(repo.name);
    return true;
  });
}

export function pinnedReposPlugin(): Plugin {
  let reposPromise: Promise<Repo[]> | undefined;

  const ensureRepos = () => {
    if (!reposPromise) {
      reposPromise = loadRepos();
    }
    return reposPromise;
  };

  return {
    name: "github-repos",
    async buildStart() {
      const repos = await ensureRepos();
      console.log(`[github-repos] loaded ${repos.length} repositor${repos.length === 1 ? "y" : "ies"} for ${GITHUB_USERNAME}`);
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) {
        return RESOLVED_VIRTUAL_ID;
      }
      return undefined;
    },
    async load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) {
        return undefined;
      }

      const repos = await ensureRepos();
      return `export const repos = ${JSON.stringify(repos)};\n`;
    },
  };
}
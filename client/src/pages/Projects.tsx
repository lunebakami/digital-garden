import { repos } from "virtual:github-repos";
import { PageChrome } from "@/components/PageChrome";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { usePage } from "@/hooks/use-pages";
import { GITHUB_PROFILE_URL, type Repo } from "@/data/github";

function languageDotStyle(color: string): { backgroundColor: string } {
  return { backgroundColor: color };
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <article className="border border-white p-4 flex flex-col gap-3 bg-[#050505] hover:bg-white hover:text-black transition-colors duration-0 group">
      <div className="flex items-start justify-between gap-3">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-bold uppercase tracking-wide underline decoration-1 underline-offset-4 group-hover:no-underline"
        >
          {repo.name}
        </a>
        {repo.primaryLanguage && (
          <span className="shrink-0 text-xs uppercase opacity-70 flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 border border-current"
              style={languageDotStyle(repo.primaryLanguage.color)}
            />
            {repo.primaryLanguage.name}
          </span>
        )}
      </div>

      <p className="text-sm opacity-80 flex-1">
        {repo.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between text-xs uppercase opacity-60 pt-2 border-t border-dashed border-gray-700 group-hover:border-black">
        <span>★ {repo.stargazerCount}</span>
        <span>forks {repo.forkCount}</span>
        {repo.homepageUrl ? (
          <a
            href={repo.homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 group-hover:text-black"
          >
            demo
          </a>
        ) : (
          <span>repo</span>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const { data: page } = usePage("projects");

  return (
    <PageChrome slug="projects">
      {page && <MarkdownRenderer content={page.content} />}

      {repos.length === 0 ? (
        <p className="opacity-70">
          Could not load repositories. Visit{" "}
          <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            {GITHUB_PROFILE_URL}
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}

      <p className="mt-8 text-xs opacity-60 uppercase">
        Source:{" "}
        <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          github.com/lunebakami
        </a>{" "}
        · pinned + public repositories
      </p>
    </PageChrome>
  );
}

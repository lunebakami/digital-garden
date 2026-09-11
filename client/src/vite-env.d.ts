/// <reference types="vite/client" />

declare module "virtual:github-repos" {
  import type { Repo } from "./data/github";

  export const repos: Repo[];
}

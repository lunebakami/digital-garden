export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
}

export const pages: Page[] = [
  {
    id: 1,
    slug: "home",
    title: "Index",
    content: `# Welcome to My Digital Garden

> "Simplicity is the ultimate sophistication."

## About Me
I am a creative developer who loves minimalism and retro aesthetics. 
This portfolio is a tribute to the early days of the web.

## Skills
- **Frontend**: React, TypeScript, Tailwind
- **Backend**: Node.js, PostgreSQL
- **Design**: Minimalist, Brutalist

## Latest Projects
1. [Project Alpha](#) - A retro game engine
2. [Project Beta](#) - CLI tool for designers
3. [Project Gamma](#) - Monochrome photo gallery

---
*Last updated: 1999-12-31*`,
  },
  {
    id: 2,
    slug: "projects",
    title: "Projects",
    content: `# Projects Directory

## /src/web-apps
- **E-commerce Platform**: A headless shopify implementation.
- **Social Graph**: A graph database visualization.

## /src/experiments
- **CSS Art**: Pure CSS drawings.
- **WebGL Shaders**: 3D experiments.

## /src/contributions
- Contributed to several open source libraries.`,
  },
  {
    id: 3,
    slug: "contact",
    title: "Contact",
    content: `# Contact

You can reach me through the following channels:

- **Email**: [me@example.com](mailto:me@example.com)
- **Twitter**: [@username](https://twitter.com)
- **GitHub**: [github.com/username](https://github.com)`,
  },
];

export function getAllPages(): Page[] {
  return pages;
}

export function getPageBySlug(slug: string): Page | undefined {
  return pages.find((p) => p.slug === slug);
}

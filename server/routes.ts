import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.pages.list.path, async (req, res) => {
    const pages = await storage.getAllPages();
    res.json(pages);
  });

  app.get(api.pages.getBySlug.path, async (req, res) => {
    const page = await storage.getPageBySlug(req.params.slug);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json(page);
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getAllPages();
  if (existing.length === 0) {
    await storage.createPage({
      slug: "home",
      title: "Index",
      content: `
# Welcome to My Digital Garden

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
*Last updated: 1999-12-31*
      `
    });

    await storage.createPage({
      slug: "projects",
      title: "Projects",
      content: `
# Projects Directory

## /src/web-apps
- **E-commerce Platform**: A headless shopify implementation.
- **Social Graph**: A graph database visualization.

## /src/experiments
- **CSS Art**: Pure CSS drawings.
- **WebGL Shaders**: 3D experiments.

## /src/contributions
- Contributed to several open source libraries.
      `
    });
    
    await storage.createPage({
      slug: "contact",
      title: "Contact.txt",
      content: `
# Contact

You can reach me through the following channels:

- **Email**: [me@example.com](mailto:me@example.com)
- **Twitter**: [@username](https://twitter.com)
- **GitHub**: [github.com/username](https://github.com)
      `
    });
  }
}

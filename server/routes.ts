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

  return httpServer;
}

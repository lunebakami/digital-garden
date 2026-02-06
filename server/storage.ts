import { db } from "./db";
import { pages, type Page, type InsertPage } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPageBySlug(slug: string): Promise<Page | undefined>;
  getAllPages(): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
}

export class DatabaseStorage implements IStorage {
  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page;
  }

  async getAllPages(): Promise<Page[]> {
    return await db.select().from(pages);
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const [page] = await db.insert(pages).values(insertPage).returning();
    return page;
  }
}

export const storage = new DatabaseStorage();

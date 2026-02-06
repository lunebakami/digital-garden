import fs from "fs/promises";
import path from "path";
import { type Page, type InsertPage } from "@shared/schema";

export interface IStorage {
  getPageBySlug(slug: string): Promise<Page | undefined>;
  getAllPages(): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
}

export class FileStorage implements IStorage {
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(process.cwd(), "portfolio.md");
  }

  private async parseMarkdown(): Promise<Page[]> {
    try {
      const content = await fs.readFile(this.filePath, "utf-8");
      const sections = content.split("---").filter(s => s.trim());
      
      return sections.map((section, index) => {
        const lines = section.trim().split("\n");
        const titleLine = lines.find(l => l.startsWith("# ")) || "# Untitled";
        const slugLine = lines.find(l => l.startsWith("slug: ")) || "slug: unknown";
        
        const title = titleLine.replace("# ", "").trim();
        const slug = slugLine.replace("slug: ", "").trim();
        
        // Remove the metadata lines from the actual content
        const markdownContent = lines
          .filter(l => !l.startsWith("slug: "))
          .join("\n")
          .trim();

        return {
          id: index + 1,
          slug,
          title,
          content: markdownContent,
          updatedAt: new Date()
        };
      });
    } catch (error) {
      console.error("Error reading portfolio.md:", error);
      return [];
    }
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const pages = await this.parseMarkdown();
    return pages.find(p => p.slug === slug);
  }

  async getAllPages(): Promise<Page[]> {
    return await this.parseMarkdown();
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    // For a file-based system, we'll just return what would be created
    // or tell the user to edit the file.
    const pages = await this.parseMarkdown();
    const newPage = {
      ...insertPage,
      id: pages.length + 1,
      updatedAt: new Date()
    };
    return newPage;
  }
}

export const storage = new FileStorage();

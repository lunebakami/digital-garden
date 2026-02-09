import fs from "fs/promises";
import path from "path";
import { type Page, type InsertPage } from "@shared/schema";

export interface IStorage {
  getPageBySlug(slug: string): Promise<Page | undefined>;
  getAllPages(): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
}

export class FileStorage implements IStorage {
  private contentDir: string;

  constructor() {
    this.contentDir = path.resolve(process.cwd(), "content");
  }

  private parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
      return { frontmatter: {}, body: content };
    }

    const frontmatterText = match[1];
    const body = match[2].trim();

    const frontmatter: Record<string, string> = {};
    frontmatterText.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        frontmatter[key] = value;
      }
    });

    return { frontmatter, body };
  }

  private async readMarkdownFile(filePath: string, index: number): Promise<Page | null> {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const { frontmatter, body } = this.parseFrontmatter(content);
      
      const filename = path.basename(filePath, '.md');
      
      return {
        id: index + 1,
        slug: frontmatter.slug || filename,
        title: frontmatter.title || filename,
        content: body,
        updatedAt: frontmatter.updatedAt ? new Date(frontmatter.updatedAt) : new Date()
      };
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return null;
    }
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const filePath = path.join(this.contentDir, `${slug}.md`);
    
    // Try to read the specific file first
    try {
      await fs.access(filePath);
      const page = await this.readMarkdownFile(filePath, 0);
      if (page && page.slug === slug) {
        return page;
      }
    } catch {
      // File doesn't exist, fall through to search all files
    }

    // Search through all files to find matching slug in frontmatter
    const pages = await this.getAllPages();
    return pages.find(p => p.slug === slug);
  }

  async getAllPages(): Promise<Page[]> {
    try {
      const files = await fs.readdir(this.contentDir);
      const markdownFiles = files.filter(f => f.endsWith('.md'));
      
      const pages: Page[] = [];
      for (let i = 0; i < markdownFiles.length; i++) {
        const filePath = path.join(this.contentDir, markdownFiles[i]);
        const page = await this.readMarkdownFile(filePath, i);
        if (page) {
          pages.push(page);
        }
      }
      
      return pages.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error("Error reading content directory:", error);
      return [];
    }
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const pages = await this.getAllPages();
    const newPage = {
      ...insertPage,
      id: pages.length + 1,
      updatedAt: new Date()
    };
    
    // Write the new page to a markdown file
    const filePath = path.join(this.contentDir, `${newPage.slug}.md`);
    const content = `---\nslug: ${newPage.slug}\ntitle: ${newPage.title}\nupdatedAt: ${newPage.updatedAt.toISOString()}\n---\n\n${newPage.content}`;
    
    await fs.writeFile(filePath, content, "utf-8");
    
    return newPage;
  }
}

export const storage = new FileStorage();

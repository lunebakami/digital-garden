import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // e.g., 'home', 'projects'
  title: text("title").notNull(),
  content: text("content").notNull(), // Markdown content
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPageSchema = createInsertSchema(pages).omit({ 
  id: true,
  updatedAt: true 
});

export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;

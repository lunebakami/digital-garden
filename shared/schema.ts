import { z } from "zod";

export const pageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  updatedAt: z.date().optional(),
});

export const insertPageSchema = pageSchema.omit({ 
  id: true,
  updatedAt: true 
});

export type Page = z.infer<typeof pageSchema>;
export type InsertPage = z.infer<typeof insertPageSchema>;

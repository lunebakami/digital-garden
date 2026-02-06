import { z } from 'zod';
import { insertPageSchema, pages } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  pages: {
    getBySlug: {
      method: 'GET' as const,
      path: '/api/pages/:slug',
      responses: {
        200: z.custom<typeof pages.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/pages',
      responses: {
        200: z.array(z.custom<typeof pages.$inferSelect>()),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

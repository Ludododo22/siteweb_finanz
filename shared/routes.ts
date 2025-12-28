import { z } from 'zod';
import { insertLoanApplicationSchema, loanApplications } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  loans: {
    submit: {
      method: 'POST' as const,
      path: '/api/loans',
      input: insertLoanApplicationSchema,
      responses: {
        201: z.custom<typeof loanApplications.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    upload: {
      method: 'POST' as const,
      path: '/api/upload',
      // Input is multipart/form-data, handled specially
      responses: {
        200: z.object({
          url: z.string(),
          filename: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
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

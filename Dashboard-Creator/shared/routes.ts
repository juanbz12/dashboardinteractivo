import { z } from "zod";
import { metrics, salesData } from "./schema";

export const api = {
  metrics: {
    list: {
      method: "GET" as const,
      path: "/api/metrics" as const,
      responses: {
        200: z.array(z.custom<typeof metrics.$inferSelect>()),
      },
    },
  },
  sales: {
    list: {
      method: "GET" as const,
      path: "/api/sales" as const,
      responses: {
        200: z.array(z.custom<typeof salesData.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}

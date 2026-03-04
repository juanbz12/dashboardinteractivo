import { pgTable, text, serial, integer, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: doublePrecision("value").notNull(),
  change: doublePrecision("change").notNull(),
  trend: text("trend").$type<"up" | "down" | "neutral">().notNull(),
  category: text("category").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const salesData = pgTable("sales_data", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  revenue: doublePrecision("revenue").notNull(),
  orders: integer("orders").notNull(),
});

export const insertMetricSchema = createInsertSchema(metrics).omit({ id: true, timestamp: true });
export const insertSalesDataSchema = createInsertSchema(salesData).omit({ id: true });

export type Metric = typeof metrics.$inferSelect;
export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type SalesData = typeof salesData.$inferSelect;
export type InsertSalesData = z.infer<typeof insertSalesDataSchema>;

export type MetricsResponse = Metric[];
export type SalesDataResponse = SalesData[];

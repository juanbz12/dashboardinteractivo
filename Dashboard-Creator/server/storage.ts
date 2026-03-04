import { db } from "./db";
import { metrics, salesData, type Metric, type SalesData, type InsertMetric, type InsertSalesData } from "@shared/schema";

export interface IStorage {
  getMetrics(): Promise<Metric[]>;
  getSalesData(): Promise<SalesData[]>;
  createMetric(metric: InsertMetric): Promise<Metric>;
  createSalesData(data: InsertSalesData): Promise<SalesData>;
}

export class DatabaseStorage implements IStorage {
  async getMetrics(): Promise<Metric[]> {
    return await db.select().from(metrics);
  }

  async getSalesData(): Promise<SalesData[]> {
    return await db.select().from(salesData);
  }

  async createMetric(insertMetric: InsertMetric): Promise<Metric> {
    const [metric] = await db.insert(metrics).values(insertMetric).returning();
    return metric;
  }

  async createSalesData(insertSales: InsertSalesData): Promise<SalesData> {
    const [data] = await db.insert(salesData).values(insertSales).returning();
    return data;
  }
}

export const storage = new DatabaseStorage();

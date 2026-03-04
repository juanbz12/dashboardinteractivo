import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.metrics.list.path, async (_req, res) => {
    const data = await storage.getMetrics();
    res.json(data);
  });

  app.get(api.sales.list.path, async (_req, res) => {
    const data = await storage.getSalesData();
    res.json(data);
  });

  // Seed data if empty
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const existingMetrics = await storage.getMetrics();
  if (existingMetrics.length === 0) {
    await storage.createMetric({ name: "Revenue", value: 45231.89, change: 20.1, trend: "up", category: "Financial" });
    await storage.createMetric({ name: "Subscriptions", value: 2350, change: 180.1, trend: "up", category: "Growth" });
    await storage.createMetric({ name: "Sales", value: 12234, change: 19, trend: "up", category: "Financial" });
    await storage.createMetric({ name: "Active Now", value: 573, change: 201, trend: "up", category: "Real-time" });
  }

  const existingSales = await storage.getSalesData();
  if (existingSales.length === 0) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    for (const month of months) {
      await storage.createSalesData({
        month,
        revenue: Math.floor(Math.random() * 5000) + 1000,
        orders: Math.floor(Math.random() * 100) + 20,
      });
    }
  }
}

import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
  decimal,
} from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id),
  role: varchar("role", { length: 50 }), // user or assistant
  content: text("content"),
  agent: varchar("agent", { length: 50 }),
  reasoning: text("reasoning"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id"), // assuming some customer id
  status: varchar("status", { length: 50 }), // pending, shipped, delivered
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 50 }), // success, failed, refunded
  createdAt: timestamp("created_at").defaultNow(),
});

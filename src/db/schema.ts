import { bigint, index, integer, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const admins = pgTable("admins", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("admins_email_unique").on(table.email)]);

export const leads = pgTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  source: text("source").notNull(),
  propertySlug: text("property_slug"),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("leads_created_at_idx").on(table.createdAt), index("leads_status_idx").on(table.status)]);

export const analyticsEvents = pgTable("analytics_events", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  sessionId: text("session_id").notNull(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  data: jsonb("data").$type<Record<string, string | number | boolean>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("analytics_created_at_idx").on(table.createdAt), index("analytics_name_idx").on(table.name), index("analytics_session_idx").on(table.sessionId)]);

export const rateEvents = pgTable("rate_events", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  keyHash: text("key_hash").notNull(),
  action: text("action").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("rate_lookup_idx").on(table.keyHash, table.action, table.createdAt)]);

export type AuditIssue = { code: string; severity: "error" | "warning" | "info"; route: string; message: string };
export const auditRuns = pgTable("audit_runs", {
  id: text("id").primaryKey(),
  status: text("status").notNull(),
  score: integer("score").notNull(),
  routesChecked: integer("routes_checked").notNull(),
  issues: jsonb("issues").$type<AuditIssue[]>().default([]).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").$type<Record<string, unknown>>().default({}).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

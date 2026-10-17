import "server-only";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let database: PostgresJsDatabase<typeof schema> | null | undefined;

export function hasDatabase() { return Boolean(process.env.DATABASE_URL); }

export function getDb() {
  if (database !== undefined) return database;
  const url = process.env.DATABASE_URL;
  if (!url) { database = null; return database; }
  const client = postgres(url, { max: 5, prepare: false, idle_timeout: 20, connect_timeout: 10 });
  database = drizzle(client, { schema });
  return database;
}

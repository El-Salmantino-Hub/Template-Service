import { pgTable } from 'drizzle-orm/pg-core';

export const template = pgTable("template", (t) => ({
  id: t.uuid("id").primaryKey(),
}))
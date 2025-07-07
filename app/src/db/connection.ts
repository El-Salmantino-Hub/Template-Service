import { config } from '@config/env';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const { CONNECTION_STRING } = config

export const pool = new Pool({ connectionString: CONNECTION_STRING });
export const db: NodePgDatabase = drizzle(pool)
import { logger } from '@/utils/logger';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { pool } from '@db/connection';
import { sql } from 'drizzle-orm';

export async function waitUntilDatabaseReady(maxRetries = 10, delayMs = 5000) {
  logger.debug('Waiting for database connection...');
  for (let i = 0; i < maxRetries; i++) {
    try {
      await pool.query('SELECT 1');
      logger.debug('✅ Database connection is ready');
      return
    } catch (error) {
      console.log(error)
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  logger.error('❌ Database connection failed after maximum retries');
  throw new Error('Database connection failed');
}

export async function runSeeders(db: NodePgDatabase) {
  try {
    // TODO: Implement your seeders logic here
    logger.debug('Seeders executed successfully');
  } catch (error) {
    logger.error(error, 'Error running seeders');
    throw error;
  }
}

export async function runMigrations(db: NodePgDatabase) {
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    logger.debug('Migrations completed successfully');
  } catch (error) {
    logger.error(error, 'Error running migrations');
    throw error;
  }
}

export async function dropAllSchemas(db: NodePgDatabase): Promise<void> {
  type TableNameRow = { table_schema: string };
  const query = sql<TableNameRow>`
    SELECT table_schema
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema', 'drizzle')
  `;

  const tables = await db.execute(query);

  for (const table of tables.rows) {
    await db.execute(sql.raw(`DROP SCHEMA "${table.table_schema}" CASCADE;`));
    await db.execute(sql.raw(`CREATE SCHEMA "${table.table_schema}";`));
  }

  logger.info('All schemas dropped and recreated successfully');
}
import { db } from '@db/connection';
import { runMigrations, runSeeders, waitUntilDatabaseReady } from '@db/utils';

export async function initializeDatabase() {
  await waitUntilDatabaseReady();
  await runMigrations(db);
  await runSeeders(db);
}
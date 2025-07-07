import { fileURLToPath } from 'url';
import { initializeDatabase } from '@db/index';
import { initializeServer } from './server';

export async function initializeTemplateService() {
  await initializeDatabase()
  initializeServer()  
}

const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
  initializeTemplateService()
}
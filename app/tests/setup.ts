import { beforeAll } from 'vitest';
import { initializeTemplateService } from '@/index';

beforeAll(async () => {
  await initializeTemplateService();
})
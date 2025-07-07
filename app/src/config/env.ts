import dotenv from 'dotenv';
import { logger } from '@/utils/logger';
import { z } from 'zod';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: './../.env.test'
  })
}

if (!process.env.DB_USER) {
  dotenv.config({
    path: './../.env.dev'
  }) 
}

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5003),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_HOST: z.string().default('0.0.0.0'),
  DB_PORT: z.coerce.number().default(5432),
})

const env = envSchema.safeParse(process.env);

if (!env.success) {
  logger.error('Invalid environment variables', env.error.format());
  throw new Error('Invalid environment variables');
}

const data = {
  ...env.data,
  CONNECTION_STRING: `postgres://${env.data.DB_USER}:${env.data.DB_PASSWORD}@${env.data.DB_HOST}:${env.data.DB_PORT}/${env.data.DB_NAME}`,
}

export const config = data
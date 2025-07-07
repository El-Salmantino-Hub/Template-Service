import { config } from './src/config/env.ts';

const { CONNECTION_STRING } = config

export default {
  schema: './src/db/schemas/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: CONNECTION_STRING
  },
};
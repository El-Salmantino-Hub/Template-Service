import express, { Express } from 'express';
import { config } from '@config/env';
import { defineMiddleware } from '@api/middleware';
import { defineRouter } from '@api/router';
import { logger } from '@utils/logger';

const { PORT } = config;

export const app: Express = express();

export async function initializeServer() {
  defineMiddleware(app)
  defineRouter(app);

  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  }); 
}
import express, { Express } from 'express';
import { config } from '@config/env';
import { defineMiddleware } from '@api/middlewares';
import { defineRouter } from '@/api/routes';
import { DependentServicesService } from '@api/services';
import { logger } from '@utils/logger';
import { setReady } from '@states/index';

const { PORT } = config;

export const app: Express = express();

export async function initializeServer() {
  defineMiddleware(app)
  defineRouter(app);

  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  }); 

  await DependentServicesService.checkDependentServices();
  
  setReady()
  logger.debug('Server is ready and listening for requests')
}
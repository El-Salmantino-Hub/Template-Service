import express, { Express } from 'express';
import { readinessMiddleware } from '@api/middlewares/readiness.middleware';

export const defineMiddleware = (app: Express) => {
  app.use(express.json())
  app.use(readinessMiddleware)
}
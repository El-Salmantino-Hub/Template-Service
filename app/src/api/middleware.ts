import express, { Express } from 'express';

export const defineMiddleware = (app: Express) => {
  app.use(express.json())
}
import express, { Express, Response } from 'express';

export const defineRouter = (app: Express) => {
  const router = express.Router() 
  
  app.use('/api', router);
  app.get('/ping', (_, res: Response) => {
    res.status(200).send('pong');
  })
}
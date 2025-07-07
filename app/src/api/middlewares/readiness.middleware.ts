import { getReady } from '@/states/readiness.state';
import { NextFunction, Request, Response } from 'express';

export function readinessMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!getReady()) {
    res.status(503).json({ message: 'Service is not ready yet' });
    return
  }

  next();
}
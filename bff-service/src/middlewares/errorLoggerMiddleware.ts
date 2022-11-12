import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger/logger';

function errorLoggerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error({
    level: 'error',
    message: err.message,
  });
  res.status(500).send('Internal server error');
  next(err);
}

export default errorLoggerMiddleware;

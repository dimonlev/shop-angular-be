import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body = Object.keys(req.body).length ? JSON.stringify(req.body) : 'none';

  const params = Object.keys(req.query).length
    ? JSON.stringify(req.query)
    : 'none';
  logger.info({
    message: 'Request',
    method: req.method,
    path: req.path,
    params: `Params: ${params}`,
    body: `Body: ${body}`,
  });
  next();
};

export default requestLoggerMiddleware;

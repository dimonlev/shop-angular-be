import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../logger/logger';

const loginAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ message: 'No authorization in headers' });
  } else {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err) {
      if (err) {
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
        };
        logger.error(err);
        res.status(403).send({ message: 'Expired token' });
      } else {
        next();
      }
    });
  }
};

export default loginAuthMiddleware;

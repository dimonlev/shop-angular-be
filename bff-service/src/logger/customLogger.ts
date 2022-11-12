import { Request, Response, NextFunction } from 'express';

export const customLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body =
    Object.keys(req.body).length !== 0 ? JSON.stringify(req.body) : 'none body';

  console.log(`Method: ${req.method}`);
  console.log(`Body: ${body}`);
  console.log(`Path: ${req.path}`);

  next();
};

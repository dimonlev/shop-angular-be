import { app } from './app';
import { createConnection } from 'typeorm';
import { logger } from './logger/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  createConnection().then(() => console.log('connected to db'));
  console.log(`Running on port ${PORT}`);
});

process.on('unhandledRejection', (error: Error, promise: Promise<unknown>) => {
  logger.error({
    message: `unhandled rejection in promise: ${promise} with error: ${error}`,
  });
});

process.on('uncaughtException', (error: Error) => {
  logger.error({
    message: `uncaught exception: ${error}`,
  });
});

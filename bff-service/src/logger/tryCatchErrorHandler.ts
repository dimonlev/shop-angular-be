import { logger } from './logger';

export const tryCatchErrorHandler = (target, propertyKey, descriptor): void => {
  const fn = descriptor.value;
  descriptor.value = async function (...args): Promise<void> {
    try {
      return await fn.apply(this, args);
    } catch (error) {
      logger.error(error.message);
    }
  };
};

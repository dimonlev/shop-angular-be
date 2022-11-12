import { Router } from 'express';
import { validatorRequest } from '../validator/validator';
import { PostgresUsersService } from '../services/postgres-users.service';
import { UserController } from '../controllers/user.controller';
import { loginAuthMiddleware } from '../middlewares';

const userRouter = Router();
const storageService = new PostgresUsersService();
const userController = new UserController(storageService);

userRouter
  .post(
    '/',
    loginAuthMiddleware,
    validatorRequest,
    userController.create.bind(userController)
  )
  .get(
    '/',
    loginAuthMiddleware,
    userController.getUsersByLoginSubstring.bind(userController)
  )
  .get(
    '/:userId',
    loginAuthMiddleware,
    userController.findById.bind(userController)
  )
  .delete(
    '/:userId',
    loginAuthMiddleware,
    userController.delete.bind(userController)
  )
  .put(
    '/:userId',
    loginAuthMiddleware,
    validatorRequest,
    userController.update.bind(userController)
  );

export default userRouter;

import { GroupController } from '../controllers/group.controller';
import { Router } from 'express';
import { PostgresGroupsService } from '../services/postgres-groups.service';
import { loginAuthMiddleware } from '../middlewares';

const groupRouter = Router();
const storageService = new PostgresGroupsService();
const groupController = new GroupController(storageService);

groupRouter
  .post('/', loginAuthMiddleware, groupController.create.bind(groupController))
  .get(
    '/',
    loginAuthMiddleware,
    groupController.getAllGroups.bind(groupController)
  )
  .get(
    '/:groupId',
    loginAuthMiddleware,
    groupController.findById.bind(groupController)
  )
  .post(
    '/:groupId/add',
    loginAuthMiddleware,
    groupController.addUsersToGroup.bind(groupController)
  )
  .delete(
    '/:groupId',
    loginAuthMiddleware,
    groupController.delete.bind(groupController)
  )
  .put(
    '/:groupId',
    loginAuthMiddleware,
    groupController.update.bind(groupController)
  );

export default groupRouter;

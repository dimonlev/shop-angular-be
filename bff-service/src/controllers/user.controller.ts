import { ValidatedRequest } from 'express-joi-validation';
import { RequestSchema } from '../validator/validator';
import { Request, Response } from 'express';
import { UserStorage } from '../services/users.service';
import { tryCatchErrorHandler } from '../logger/tryCatchErrorHandler';
import { ReqQuery } from '../types/loginSubstringRequest.type';

class UserController {
  constructor(private storageService: UserStorage) {}

  @tryCatchErrorHandler
  async findById(req: Request, res: Response): Promise<void> {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const isRightUUID = regexExp.test(req.params.userId);
    if (!isRightUUID) {
      res.status(404).json('id is not correct');
    } else {
      const user = await this.storageService.findById(req.params.userId);

      if (!user) {
        res.status(404).json('user not found');
      } else if (user.isdeleted) {
        res.status(404).json('user deleted, please try another request');
      } else {
        res.json(user);
      }
    }
  }

  @tryCatchErrorHandler
  async create(
    req: ValidatedRequest<RequestSchema>,
    res: Response
  ): Promise<void> {
    const isFound = await this.storageService.findByLogin(req.body.login);
    if (!isFound) {
      const user = await this.storageService.create(req.body);
      res.status(201).json(user);
    } else {
      res.json('user already exists, please try another login');
    }
  }

  @tryCatchErrorHandler
  async update(
    req: ValidatedRequest<RequestSchema>,
    res: Response
  ): Promise<void> {
    const user = await this.storageService.update(req.params.userId, req.body);
    res.json(user);
  }

  @tryCatchErrorHandler
  async delete(req: Request, res: Response): Promise<void> {
    const deletedUser = await this.storageService.findById(req.params.userId);
    if (!deletedUser) {
      res
        .status(404)
        .json("havn't this user, please check and try another request");
    } else if (deletedUser.isdeleted === true) {
      res.status(403).json('user already deleted');
    } else {
      await this.storageService.delete(req.params.userId);
      res.json({ message: 'deleted' });
    }
  }

  @tryCatchErrorHandler
  async getUsersByLoginSubstring(
    req: Request<unknown, unknown, unknown, ReqQuery>,
    res: Response
  ): Promise<void> {
    const { limit, loginSubstring } = req.query;
    const sortedArray = await this.storageService.getAutoSuggestUsers(
      loginSubstring,
      +limit
    );
    res.json(sortedArray.length ? sortedArray : "still don't have users");
  }
}

export { UserController };

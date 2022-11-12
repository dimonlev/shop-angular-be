import { Request, Response } from 'express';
import { PostgresUsersService } from '../services/postgres-users.service';
import { tryCatchErrorHandler } from '../logger/tryCatchErrorHandler';

import { LoginService } from '../services/login.service';

class LoginController {
  constructor(private jwtLoginService: LoginService) {}
  @tryCatchErrorHandler
  async signToken(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const isUserExist = await PostgresUsersService.findByLoginAndPassword(body);
    if (isUserExist) {
      const token = this.jwtLoginService.signToken(body);
      res.json({ token });
    } else {
      res.status(400).json({ message: "pair of login/password doesn't exist" });
    }
  }
}

export { LoginController };

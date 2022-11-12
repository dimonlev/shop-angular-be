import { LoginController } from '../controllers/login.controller';
import { Router } from 'express';
import { JwtLoginService } from '../services/jwt-login.service';

const loginRouter = Router();

const jwtLoginService = new JwtLoginService();
const loginController = new LoginController(jwtLoginService);

loginRouter.post('/', loginController.signToken.bind(loginController));

export default loginRouter;

import { Login } from '../models/login.type';
import { LoginService } from './login.service';
import jwt from 'jsonwebtoken';

class JwtLoginService implements LoginService {
  signToken(body: Login): string {
    console.log(body);
    const token = jwt.sign(body, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  }
}

export { JwtLoginService };

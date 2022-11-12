import { Login } from '../models/login.type';

interface LoginService {
  signToken: (body: Login) => string;
}

export { LoginService };

import { User } from '../models/user.type';

interface UserStorage {
  findById: (id: string) => User | undefined | Promise<User | undefined>;
  findByLogin: (login: string) => User | undefined | Promise<User | undefined>;
  create: (user: User) => User | undefined | Promise<User | undefined>;
  update: (
    id: string,
    user: User
  ) => User | undefined | Promise<User | undefined>;
  delete: (id: string) => void | Promise<void>;
  getAutoSuggestUsers: (
    loginSubstring: string | undefined,
    limit: number | undefined
  ) => User[] | [] | Promise<User[] | []>;
  
}

export { UserStorage };

// import { ConnectionToDb } from '../data-access/connectionToDb';
import { getRepository } from 'typeorm';
import { UserEntity } from '../entity/User/user.entity';
import { User } from '../models/user.type';
import { UserStorage } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import { Login } from '../models/login.type';

const LIMIT_DEFAULT = 10;

class PostgresUsersService implements UserStorage {
  private entity = UserEntity;

  async findById(id: string): Promise<User | undefined> {
    const user = await getRepository(this.entity).findOne({ id });
    return user;
  }

  async findByLogin(login: string): Promise<User | undefined> {
    const user = await getRepository(this.entity).findOne({ login });
    return user;
  }

  async create(user: Omit<User, 'id'>): Promise<User | undefined> {
    const createdUser = {
      id: uuidv4(),
      ...user,
    };
    await getRepository(this.entity).save(createdUser);
    return createdUser;
  }

  async update(id: string, user: Omit<User, 'id'>): Promise<User | undefined> {
    const userToUpdate = await this.findById(id);
    if (userToUpdate) {
      userToUpdate.login = user.login;
      userToUpdate.password = user.password;
      userToUpdate.age = user.age;
    }
    await getRepository(this.entity).save(userToUpdate);
    return userToUpdate;
  }

  async delete(id: string): Promise<void> {
    const userToUpdate = await this.findById(id);
    if (userToUpdate) {
      userToUpdate.isdeleted = true;
    }
    await getRepository(this.entity).save(userToUpdate);
  }

  async getAutoSuggestUsers(
    loginSubstring?: string,
    limit?: number
  ): Promise<User[]> {
    let sortedUsersArray: User[] = [];
    if (!loginSubstring) {
      sortedUsersArray = await getRepository(this.entity).find({
        isdeleted: false,
      });
    } else {
      const userRepository = await getRepository(this.entity).find();
      userRepository.forEach((user: UserEntity) => {
        if (!user.isdeleted && user.login.includes(loginSubstring)) {
          sortedUsersArray.push(user);
        }
      });
    }

    const resultArrayOfUsers = sortedUsersArray
      .sort((a, b) => (a.login > b.login ? 1 : -1))
      .filter((user, index) => index < (limit ? limit : LIMIT_DEFAULT));
    return resultArrayOfUsers;
  }

  static async findByLoginAndPassword(body: Login): Promise<boolean> {
    const isFound = await getRepository(UserEntity).findOne({
      login: body.login,
      password: body.password,
    });
    return isFound ? true : false;
  }
}

export { PostgresUsersService };

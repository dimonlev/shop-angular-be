import { UserStorage } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.type';

const LIMIT_DEFAULT = 10;

class InMemoryUsersService implements UserStorage {
  private users: User[] = [
    {
      id: 'f62b11c0-690c-494e-9a75-9030314fea89',
      login: 'Pasha1',
      password: 'password123',
      age: 23,
      isdeleted: false,
    },
    {
      id: 'a9b14031-956e-4a5d-98dc-de9d299d2fd9',
      login: 'Masha1',
      password: 'password123',
      age: 26,
      isdeleted: false,
    },
    {
      id: 'd59164d5-210a-49b9-a61f-9225a95e5531',
      login: 'Sasha1',
      password: 'password123',
      age: 35,
      isdeleted: false,
    },
    {
      id: 'eab26f50-873d-4d84-b63d-78db129d3ca8',
      login: 'Grisha1',
      password: 'password123',
      age: 47,
      isdeleted: false,
    },
  ];

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByLogin(login: string): User | undefined {
    return this.users.find((user) => user.login === login);
  }

  create(user: Omit<User, 'id'>): User {
    const createdUser = {
      id: uuidv4(),
      ...user,
    };
    this.users = this.users.concat([createdUser]);
    return createdUser;
  }

  update(id: string, user: User): User | undefined {
    const userToUpdate = this.findById(id);
    const users = this.users.filter((user) => user.id !== id);
    if (userToUpdate) {
      const updatedUser = {
        ...userToUpdate,
        ...user,
      };
      this.users = users.concat([updatedUser]);
      return updatedUser;
    }
  }

  delete(id: string): void {
    const user = this.findById(id);
    if (user) {
      user.isdeleted = true;
    }
  }

  getAutoSuggestUsers(
    loginSubstring: string | undefined,
    limit: number | undefined
  ): User[] {
    let sortedArray: User[] = [];
    if (!loginSubstring) {
      sortedArray = this.users
        .slice()
        .filter((user) => user.isdeleted === false);
    } else {
      this.users.forEach((user) => {
        const regex = new RegExp(`${loginSubstring}`);
        if (user.isdeleted === false && regex.test(user.login)) {
          sortedArray.push(user);
        }
      });
    }

    const final = sortedArray
      .sort((a, b) => (a.login > b.login ? 1 : -1))
      .filter((user, index) => index < (limit ? limit : LIMIT_DEFAULT));
    return final;
  }
}

export { InMemoryUsersService };

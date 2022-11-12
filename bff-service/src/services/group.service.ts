import { Group } from '../models/group.type';

interface GroupStorage {
  findById: (id: string) => Promise<Group | undefined>;
  findByName: (login: string) => Promise<Group | undefined>;
  getAllGroups: () => Promise<Group[] | undefined>;
  create: (Group: Omit<Group, 'id'>) => Promise<Group | undefined>;
  update: (id: string, Group: Omit<Group, 'id'>) => Promise<Group | undefined>;
  delete: (id: string) => Promise<void>;
  addUsersToGroup: (groupId: string, userIds: string[]) => Promise<void>;
}
export { GroupStorage };

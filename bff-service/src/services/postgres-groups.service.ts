// import { ConnectionToDb } from '../data-access/connectionToDb';
import { getManager, getRepository } from 'typeorm';
import { GroupEntity } from '../entity/Group/group.entity';
import { GroupStorage } from './group.service';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../models/group.type';
import { UserEntity } from '../entity/User/user.entity';

class PostgresGroupsService implements GroupStorage {
  private groupRepository;
  private userRepository;

  async findById(id: string): Promise<Group | undefined> {
    const group = await getRepository(GroupEntity).findOne({ id });
    return group;
  }

  async getAllGroups(): Promise<Group[] | undefined> {
    const groups = await getRepository(GroupEntity).find();
    return groups;
  }

  async findByName(name: string): Promise<Group | undefined> {
    const group = await getRepository(GroupEntity).findOne({ name });
    return group;
  }

  async create(group: Omit<Group, 'id'>): Promise<Group | undefined> {
    const createdGroup = {
      id: uuidv4(),
      ...group,
    };
    await getRepository(GroupEntity).save(createdGroup);
    const createdGroupFromDb = await this.findById(createdGroup.id);
    return createdGroupFromDb;
  }

  async update(
    id: string,
    group: Omit<Group, 'id'>
  ): Promise<Group | undefined> {
    const groupToUpdate = await this.findById(id);
    if (groupToUpdate) {
      groupToUpdate.name = group.name;
      groupToUpdate.permissions = group.permissions;
    }
    await getRepository(GroupEntity).save(groupToUpdate);
    return groupToUpdate;
  }

  async delete(id: string): Promise<void> {
    const groupToRemove = await this.findById(id);
    this.groupRepository = getRepository(GroupEntity);
    if (groupToRemove) {
      await this.groupRepository.remove(groupToRemove);
    }
  }

  async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    await getManager().transaction(async (transactionalEntityManager) => {
      const groupToAddUsersIds = await getRepository(GroupEntity).findOne({
        id: groupId,
      });

      const userEntitiesArray: UserEntity[] = [];

      for (const userId of userIds) {
        const userEntity = await getRepository(UserEntity).findOne({
          id: userId,
        });
        userEntitiesArray.push(userEntity);
      }

      await groupToAddUsersIds.addUsersToGroup(userEntitiesArray);
      await transactionalEntityManager.save(groupToAddUsersIds);
    });
  }
}

export { PostgresGroupsService };

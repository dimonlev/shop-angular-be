import { UserEntity } from '../User/user.entity';
import { Permission } from '../../models/group.type';
import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('groups')
export class GroupEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({
    array: true,
    type: 'enum',
    enum: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
    default: [],
  })
  permissions: Permission[];

  @ManyToMany(() => UserEntity, (user) => user.group, {
    cascade: true,
  })
  @JoinTable()
  users: UserEntity[];

  async addUsersToGroup(userIds: UserEntity[]): Promise<void> {
    if (this.users === undefined) {
      this.users = await new Array<UserEntity>();
    }
    this.users.push(...userIds);
  }
}

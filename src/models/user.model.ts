import {
  Column,
  Model,
  Table,
  BeforeCreate,
  DataType,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

import { TUser } from 'src/modules/users/users.types';
import { TValueof } from '@/types/common';
import { ROLES } from '@/constants/roles';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class User extends Model implements TUser {
  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column({ field: 'email', unique: true })
  email: string;

  @Column({ field: 'status' })
  status: string;

  @Column({ field: 'password' })
  password: string;

  @Column({
    field: 'role',
    type: DataType.ENUM(...Object.keys(ROLES).map((v) => ROLES[v])),
  })
  role: TValueof<typeof ROLES>;

  @BeforeCreate
  static async hashPassword(user: TUser) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  static async validatePassword(
    password: string,
    user: TUser,
  ): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  static userResponse(user: Model<TUser>) {
    return { ...user.dataValues, password: null };
  }
}

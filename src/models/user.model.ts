import { Column, Model, Table, BeforeCreate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

import { TUser } from 'src/modules/users/types';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model implements TUser {
  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column({ field: 'first_kana' })
  firstKana: string;

  @Column({ field: 'last_kana' })
  lastKana: string;

  @Column({ field: 'email', unique: true })
  email: string;

  @Column({ field: 'status' })
  status: string;

  @Column({ field: 'student_number' })
  studentNumber: string;

  @Column({ field: 'password' })
  password: string;

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

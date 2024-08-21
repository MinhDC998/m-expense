import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { TMember } from '@/modules/member/types';
import Department from './department.model';
import User from './user.model';

@Table({
  tableName: 'members',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Member extends Model implements TMember {
  @ForeignKey(() => Department)
  @Column({ field: 'department_id' })
  departmentId: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @Column
  role: string;

  @BelongsTo(() => Department)
  department: Department;

  @BelongsTo(() => User)
  user: User;
}

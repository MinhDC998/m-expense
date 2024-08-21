import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TPortfolio } from '@/modules/portfolio/types';
import Department from './department.model';
import Member from './member.model';

@Table({
  tableName: 'portfolios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class PortFolio extends Model implements TPortfolio {
  @ForeignKey(() => Department)
  @Column({ field: 'department_id' })
  departmentId: number;

  @ForeignKey(() => Member)
  @Column({ field: 'member_id' })
  memberId: number;

  @Column
  status: string;
  @Column
  content: string;

  @BelongsTo(() => Department)
  department: Department;

  @BelongsTo(() => Member)
  member: Member;
}

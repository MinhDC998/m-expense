import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Department from './department.model';
import { TTemplate } from '@/modules/template/types';

@Table({
  tableName: 'templates',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Template extends Model<Template> implements TTemplate {
  @ForeignKey(() => Department)
  @Column({ field: 'department_id' })
  departmentId: number;

  @Column
  type: string;
  @Column
  content: string;

  @BelongsTo(() => Department)
  department: Department;
}

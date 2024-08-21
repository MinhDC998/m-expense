import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { TDepartment } from '@/modules/departments/types';
import PortFolio from './portfolio.model';
import Template from './template.model';
import Member from './member.model';

@Table({
  tableName: 'departments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Department extends Model implements TDepartment {
  @Column
  name: string;
  @Column
  type: string;
  @Column
  region: string;

  @HasMany(() => PortFolio)
  portfolios: PortFolio[];

  @HasMany(() => Template)
  templates: Template[];

  @HasMany(() => Member)
  members: Member[];
}

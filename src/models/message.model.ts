import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './user.model';
import { TMessage } from '@/modules/message/types';
import PortFolio from './portfolio.model';

@Table({
  tableName: 'messages',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class Message extends Model<Message> implements TMessage {
  @ForeignKey(() => PortFolio)
  @Column({ field: 'portfolio_id' })
  portfolioId: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @Column
  pageNo: string;
  @Column
  threadNo: string;
  @Column
  content: string;

  @BelongsTo(() => PortFolio)
  portfolio: PortFolio;

  @BelongsTo(() => User)
  user: User;
}

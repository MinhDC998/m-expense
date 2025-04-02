import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { TValueof } from '@/common/types/common';
import { BaseEntity } from '@/common/services/models/model';
import { CURRENCY } from '@/common/constants/common';

import { User } from '@/modules/users/user.model';

import { TIncome } from './incomes.types';

export type IncomeDocument = Income & Document & BaseEntity;

@Schema({
  collection: 'incomes',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Income implements TIncome {
  value: number;
  type: string;
  incomePeriod: string;
  from: string;
  @Prop({
    enum: Object.values(CURRENCY),
    default: CURRENCY.USD,
    type: String,
  })
  currency: TValueof<typeof CURRENCY>;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  updatedBy: User;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);

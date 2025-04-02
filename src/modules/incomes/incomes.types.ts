import { CURRENCY } from '@/common/constants/common';
import { TValueof } from '@/common/types/common';
import { TUser } from '@/modules/users/users.types';

export type TIncome = {
  value: number;
  type: string;
  incomePeriod: string;
  from: string;
  currency: TValueof<typeof CURRENCY>;
  createdBy: TUser;
  updatedBy: TUser;
};

export type TCreateIncomeDTO = Omit<TIncome, 'updatedBy' | 'createdBy'>;

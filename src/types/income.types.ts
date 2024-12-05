import { CURRENCY } from '@/constants/common';
import { TValueof } from './common';

export type TIncome = {
  value: number;
  type: string;
  incomePeriod: string;
  from: string;
  currency: TValueof<typeof CURRENCY>;
};

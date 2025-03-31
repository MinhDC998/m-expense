import { CURRENCY } from '@/common/constants/common';
import { TValueof } from '../../common/types/common';

export type TIncome = {
  value: number;
  type: string;
  incomePeriod: string;
  from: string;
  currency: TValueof<typeof CURRENCY>;
};

export const PAGINATION_DEFAULT = {
  offset: 0,
  size: 20,
} as const;

export const CURRENCY = {
  USD: 'USD',
  VND: 'VND',
} as const;

export const PAID = {
  PAID_TYPE: {
    MONTHLY: 'monthly',
    IN_DATE: 'inDate',
  },
  TYPE: {
    BANK: 'bank',
    ACQUAINTANCE: 'acquaintance',
  },
} as const;

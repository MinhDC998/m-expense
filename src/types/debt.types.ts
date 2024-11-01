export type TDebt = {
  name: string;
  desc: string;
  value: number;
  paidType: string; // monthly
  interestRate: number;
  interestDuration: string;
  type: string; // bank | acquaintance
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

import { ROLES } from '@/constants/roles';
import { TValueof } from '@/types/common';

export type TUser = {
  firstName: string;
  lastName: string;
  firstKana: string;
  lastKana: string;
  email?: string;
  status: string;
  studentNumber: string;
  password: string;
  role: TValueof<typeof ROLES>;
};

export type TCreateUserDto = Omit<TUser, '_id'> & { confirmPassword: string };

export type TFindUserDto = {
  keyword: string;
};

export type TLogin = Required<Pick<TUser, 'email' | 'password'>>;

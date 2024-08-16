export type TUser = {
  firstName: string;
  lastName: string;
  firstKana: string;
  lastKana: string;
  email?: string;
  status: string;
  studentNumber: string;
  password: string;
};

export type TCreateUserDto = Omit<TUser, '_id'> & { confirmPassword: string };

export type TFindUserDto = {
  keyword: string;
};

export type TLogin = Required<Pick<TUser, 'email' | 'password'>>;

import { ROLES } from '@/constants/roles';
import { FindOptions } from 'sequelize';

export type TValueof<V> = V[keyof V];

export type TPagination<P extends FindOptions> = P & {
  offset?: number;
  size?: number;
};

export type TJwtPayload = {
  id: number;
  roles: TValueof<typeof ROLES>[];
};

export type TExact<T, U> = T extends U ? (U extends T ? T : never) : never;

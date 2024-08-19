import { FindOptions } from 'sequelize';

export type TValueof<V> = V[keyof V];

export type TPagination<P extends FindOptions> = P & {
  offset?: number;
  size?: number;
};

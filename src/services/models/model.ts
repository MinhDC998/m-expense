import { PAGINATION_DEFAULT } from '@/constants/common';
import { TPagination } from '@/types/common';
import { FindOptions, Model, ModelStatic } from 'sequelize';

type TFindAndCountResponse<T> = Promise<{
  rows: T[];
  count: number;
}>;

export class BaseRepository<T extends Model<T>> {
  constructor(private readonly model: ModelStatic<T>) {}

  getAll(options?: FindOptions<T>) {
    return this.model.findAll(options);
  }

  findOneById(id: number) {
    return this.model.findByPk(id);
  }

  findOneBy(options: FindOptions<T>) {
    return this.model.findOne(options);
  }

  findAndCountAll(options: FindOptions<T>): TFindAndCountResponse<T> {
    const result = this.model.findAll({
      ...options,
      limit: options.limit,
      offset: options.offset,
    });

    const count = this.model.count({
      where: options.where,
    });

    return Promise.all([result, count]).then(([resultRes, countRes]) => {
      return { rows: resultRes, count: countRes };
    });
  }

  pagination(options: TPagination<FindOptions<T>>): TFindAndCountResponse<T> {
    if (!options.offset) options.offset = PAGINATION_DEFAULT.offset;
    if (!options.size) options.size = PAGINATION_DEFAULT.size;

    const result = this.findAndCountAll({
      ...options,
    });

    return result;
  }

  create(data) {
    return this.model.create(data);
  }
}

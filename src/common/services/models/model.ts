import {
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  UpdateQuery,
} from 'mongoose';
import { PAGINATION_DEFAULT } from '@/common/constants/common';
import { TPagination } from '@/common/types/common';

export interface BaseEntity extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

type TFindAndCountResponse<T> = Promise<{
  rows: T[];
  count: number;
}>;

export class BaseRepository<T extends BaseEntity> {
  constructor(private readonly model: Model<T>) {}

  getAll(filter: FilterQuery<T> = {}, projection?: any) {
    return this.model.find(filter, projection).exec();
  }

  findOneById(id: string, projection?: any) {
    return this.model.findById(id, projection).exec();
  }

  findOneBy(filter: FilterQuery<T>, projection?: any) {
    return this.model.findOne(filter, projection).exec();
  }

  async findAndCountAll(options: {
    filter?: FilterQuery<T>;
    projection?: any;
    sort?: any;
    limit?: number;
    skip?: number;
  }): TFindAndCountResponse<T> {
    const { filter = {}, projection, sort, limit, skip } = options;

    const query = this.model.find(filter, projection);

    if (sort) query.sort(sort);
    if (limit) query.limit(limit);
    if (skip) query.skip(skip);

    const [rows, count] = await Promise.all([
      query.exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    return { rows, count };
  }

  async pagination(
    options: TPagination<{
      filter?: FilterQuery<T>;
      projection?: any;
      sort?: any;
    }> = {},
  ): TFindAndCountResponse<T> {
    const offset = options?.offset || PAGINATION_DEFAULT.offset;
    const size = options?.size || PAGINATION_DEFAULT.size;

    return this.findAndCountAll({
      filter: options.filter,
      projection: options.projection,
      sort: options.sort,
      limit: size,
      skip: offset,
    });
  }

  create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  update(id: string, data: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }

  // Additional MongoDB-specific methods
  aggregate(pipeline: PipelineStage[]) {
    return this.model.aggregate(pipeline).exec();
  }
}

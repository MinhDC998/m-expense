import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import { BaseRepository } from '@/common/services/models/model';

import { Income, IncomeDocument } from './incomes.model';
import { CreateIncomeDto } from './dto';

@Injectable()
export class IncomeService extends BaseRepository<IncomeDocument> {
  private readonly logger = new Logger(IncomeService.name);

  constructor(
    @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
  ) {
    super(incomeModel);
  }

  async createIncome(dto: CreateIncomeDto): Promise<IncomeDocument> {
    console.log(dto);
    return this.create(dto);
  }
}

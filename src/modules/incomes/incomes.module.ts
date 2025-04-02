import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Income, IncomeSchema } from './incomes.model';

import { IncomesController } from './incomes.controller';
import { IncomeService } from './incomes.service';
import { JwtModule } from '@/common/services/jwt/jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
    JwtModule,
  ],
  controllers: [IncomesController],
  providers: [IncomeService],
  exports: [IncomeService],
})
export class IncomesModule {}

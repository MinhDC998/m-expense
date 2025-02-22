import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { configuration, I18nConfig, DatabaseConnection } from './config';
import { LoggerMiddleware } from './common/middlewares/test';

import { UsersModule } from './modules/users/users.module';
import { DailyPaymentsController } from './modules/daily-payments/daily-payments.controller';
import { IncomesController } from './modules/incomes/incomes.controller';
import { DebtsController } from './modules/debts/debts.controller';
import { ExpenseCategoriesController } from './modules/expense-categories/expense-categories.controller';
import { ExpenseDetailController } from './modules/expense-detail/expense-detail.controller';
import { DebtHistoriesController } from './modules/debt-histories/debt-histories.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    I18nConfig,
    DatabaseConnection,
    PassportModule,
    UsersModule,
  ],
  controllers: [
    DailyPaymentsController,
    IncomesController,
    DebtsController,
    ExpenseCategoriesController,
    ExpenseDetailController,
    DebtHistoriesController,
  ],
  providers: [],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}

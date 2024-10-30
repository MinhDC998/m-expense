import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { configuration, I18nConfig, DatabaseConnection } from './config';
import { LoggerMiddleware } from './common/middlewares/test';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    I18nConfig,
    DatabaseConnection,
    PassportModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}

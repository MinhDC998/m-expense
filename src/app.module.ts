import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import DatabaseConnection from './database/db';

import { configuration } from './config';
import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './middlewares/test';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
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

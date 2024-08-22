import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { configuration, I18nConfig, DatabaseConnection } from './config';
import { LoggerMiddleware } from './middlewares/test';

import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { DepartmentsService } from './modules/departments/departments.service';
import { DepartmentsController } from './modules/departments/departments.controller';
import { DepartmentsModule } from './modules/departments/departments.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { TemplateService } from './modules/template/template.service';
import { TemplateController } from './modules/template/template.controller';
import { TemplateModule } from './modules/template/template.module';
import { MessageModule } from './modules/message/message.module';
import { MemberService } from './modules/member/member.service';
import { MemberModule } from './modules/member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    I18nConfig,
    DatabaseConnection,
    PassportModule,
    UsersModule,
    AdminsModule,
    DepartmentsModule,
    PortfolioModule,
    TemplateModule,
    MessageModule,
    MemberModule,
  ],
  controllers: [DepartmentsController, TemplateController],
  providers: [DepartmentsService, TemplateService, MemberService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}

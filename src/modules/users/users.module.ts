import { Module } from '@nestjs/common';

import { User } from '@/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@/services/jwt/jwt.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { JwtModule } from '@/services/jwt/jwt.module';
import Admin from '@/models/admin.model';

import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), JwtModule],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}

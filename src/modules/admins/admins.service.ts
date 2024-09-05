import Admin from '@/models/admin.model';
import { BaseRepository } from '@/services/models/model';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AdminsService extends BaseRepository<Admin> {
  private readonly logger = new Logger(AdminsService.name);

  constructor(
    @InjectModel(Admin)
    private readonly adminModal: typeof Admin,
  ) {
    super(adminModal);
  }
}

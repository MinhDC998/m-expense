import { AuthGuard } from '@/guards/auth.guard';
import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { CreateAdminDTO } from './dto';

@Controller('admins')
@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AdminsController {
  private readonly logger = new Logger(AdminsController.name);

  constructor(private adminService: AdminsService) {}

  @Post()
  async createAdmin(@Body() body: CreateAdminDTO) {
    return this.adminService.create(body);
  }
}

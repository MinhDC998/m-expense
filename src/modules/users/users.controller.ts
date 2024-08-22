import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiQuery } from '@nestjs/swagger';

import { FileUpload } from '@/decorators/uploadFile';
import { Roles } from '@/decorators/roles.decoration';
import { RolesGuard } from '@/guards/role.guard';
import { ROLES } from '@/constants/roles';

import { CreateUserDto, FindUserDto, LoginDto, UploadAvatar } from './dto';
import { UsersService } from './users.service';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated/i18n.generated';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private userService: UsersService) {}

  @Get()
  @ApiHeader({ name: 'lang' })
  @ApiQuery({ type: [FindUserDto] })
  async find(@Query() query) {
    return this.userService.pagination({});
  }

  @Get('admin/get')
  @Roles([ROLES.ADMIN])
  async findAll() {
    return 'admin only';
  }

  @Post('register')
  @ApiHeader({ name: 'lang' })
  async register(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('update-avatar')
  @FileUpload('file', { type: UploadAvatar })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }
}

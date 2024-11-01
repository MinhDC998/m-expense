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

import { FileUpload } from '@/common/decorators/upload-file.decorator';
import { Roles } from '@/common/decorators/roles.decorator';

import { RolesGuard } from '@/common/guards/role.guard';
import { AuthGuard } from '@/common/guards/auth.guard';
import { ROLES } from '@/constants/roles';

import {
  CreateUserDto,
  FindUserDto,
  LoginDto,
  UploadAvatar,
} from '../../common/dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private userService: UsersService) {}

  @Get('no-auth')
  async noAuth() {
    return 'no auth require';
  }

  @Get('auth')
  @UseGuards(AuthGuard)
  async auth() {
    return 'auth require';
  }

  @Get()
  @ApiHeader({ name: 'lang' })
  @ApiQuery({ type: [FindUserDto] })
  async find(@Query() query) {
    return this.userService.pagination();
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

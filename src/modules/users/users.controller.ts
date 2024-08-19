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
import {
  ApiBearerAuth,
  ApiHeader,
  ApiHeaders,
  ApiQuery,
} from '@nestjs/swagger';

import { FileUpload } from '@/decorators/uploadFile';
import { Roles } from '@/decorators/roles.decoration';
import { RolesGuard } from '@/guards/role.guard';
import { ROLES } from '@/constants/roles';

import { CreateUserDto, FindUserDto, LoginDto, UploadAvatar } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private userService: UsersService) {}

  @Get()
  @ApiQuery({ type: [FindUserDto] })
  async find(@Query() query) {
    return this.userService.pagination({});
  }

  @Get('admin/get')
  @ApiBearerAuth()
  @Roles([ROLES.ADMIN])
  async findAll() {
    return 'admin only';
  }

  @Post('register')
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
    console.log(body);
    return this.userService.login(body);
  }
}

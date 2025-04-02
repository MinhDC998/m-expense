import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import { JwtService } from '@/common/services/jwt/jwt.service';
import { BaseRepository } from '@/common/services/models/model';
import { ROLES } from '@/common/constants/roles';

import { TLogin } from './users.types';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService extends BaseRepository<UserDocument> {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    super(userModel);
  }

  async login(body: TLogin) {
    try {
      const { email, password } = body;

      const user = await this.findOneBy({ email });
      if (!user) throw new Error('User not found');

      const isValidPassword = await user.validatePassword(password, user);
      if (!isValidPassword) throw new Error('Wrong credentials!');

      const accessToken = await this.jwtService.generateToken({
        id: user.id,
        roles: [user.role],
      });

      return { ...user.userResponse(user), accessToken };
    } catch (err) {
      return { message: err?.message || 'Error' };
    }
  }
  async createUser(createUserDto): Promise<UserDocument> {
    return this.create(createUserDto);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOneBy({ email });
  }

  async updateUser(id: string, updateUserDto): Promise<UserDocument | null> {
    return this.update(id, updateUserDto);
  }

  async getUsersWithPagination(page = 1, limit = 10) {
    const size = limit;
    const offset = (page - 1) * limit;

    return this.pagination({
      size,
      offset,
      filter: { status: 'active' },
      sort: { created_at: -1 },
    });
  }

  async getAdminUsers() {
    return this.getAll({ role: ROLES.ADMIN });
  }

  async countActiveUsers() {
    const { count } = await this.findAndCountAll({
      filter: { status: 'active' },
    });
    return count;
  }
}

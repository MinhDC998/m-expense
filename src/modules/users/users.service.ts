import { InjectModel } from '@nestjs/sequelize';

import { Injectable, Logger } from '@nestjs/common';
import { User } from '@/models/user.model';
import { JwtService } from '@/services/jwt/jwt.service';

import { TCreateUserDto, TLogin } from './types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  createUser(body: TCreateUserDto) {
    return this.userModel.create(body);
  }

  async login(body: TLogin) {
    try {
      const { email, password } = body;
      const user = await this.userModel.findOne({ where: { email } });

      if (!user) throw new Error('User not found');

      const isValidPassword = await this.userModel.validatePassword(
        password,
        user,
      );

      if (!isValidPassword) throw new Error('Wrong credentials!');

      const accessToken = await this.jwtService.generateToken({
        id: user.id,
        roles: ['user'],
      });

      return { ...this.userModel.userResponse(user), accessToken };
    } catch (err) {
      return { message: err?.message || 'Error' };
    }
  }
}

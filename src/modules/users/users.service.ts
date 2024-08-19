import { InjectModel } from '@nestjs/sequelize';

import { Injectable, Logger } from '@nestjs/common';
import { User } from '@/models/user.model';
import { JwtService } from '@/services/jwt/jwt.service';

import { TCreateUserDto, TLogin } from './types';
import { BaseRepository } from '@/services/models/model';

@Injectable()
export class UsersService extends BaseRepository<User> {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {
    super(userModel);
  }

  async login(body: TLogin) {
    try {
      const { email, password } = body;
      const user = await this.findOneBy({ where: { email } });

      if (!user) throw new Error('User not found');

      const isValidPassword = await this.userModel.validatePassword(
        password,
        user,
      );

      if (!isValidPassword) throw new Error('Wrong credentials!');

      const accessToken = await this.jwtService.generateToken({
        id: user.id,
        roles: [user.role],
      });

      return { ...this.userModel.userResponse(user), accessToken };
    } catch (err) {
      console.log(err);
      return { message: err?.message || 'Error' };
    }
  }
}

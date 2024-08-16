import { ROLES } from '@/constants/roles';
import { TValueof } from '@/types/common';
import { Injectable, Module } from '@nestjs/common';
import { JwtService as JwtLibService } from '@nestjs/jwt';

type TJwtPayload = {
  id: number;
  roles: TValueof<typeof ROLES>[];
};

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: JwtLibService) {}

  async generateToken(payload: TJwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): TJwtPayload {
    return this.jwtService.verify(token);
  }
}

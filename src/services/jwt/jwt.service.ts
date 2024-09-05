import { TJwtPayload } from '@/types/common';
import { Injectable } from '@nestjs/common';
import { JwtService as JwtLibService } from '@nestjs/jwt';

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

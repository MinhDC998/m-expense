import { I18nTranslations } from '@/i18n/i18n.generated';
import { JwtService } from '@/services/jwt/jwt.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new ForbiddenException(this.i18n.t('index.forbidden'));

    const user = this.jwtService.verifyToken(token);

    if (!user) throw new ForbiddenException(this.i18n.t('index.forbidden'));

    request.body.createdBy = user.id;
    request.user = user;

    return true;
  }
}

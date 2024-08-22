import { ROLES } from '@/constants/roles';
import { I18nTranslations } from '@/generated/i18n.generated';
import { JwtService } from '@/services/jwt/jwt.service';
import { TValueof } from '@/types/common';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new ForbiddenException(this.i18n.t('index.forbidden'));

    const user = this.jwtService.verifyToken(token);

    if (
      !user ||
      !roles.some((role) => user.roles.includes(role as TValueof<typeof ROLES>))
    )
      throw new ForbiddenException(this.i18n.t('index.forbiddenRole'));

    return true;
  }
}

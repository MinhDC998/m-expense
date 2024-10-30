import { ROLES } from '@/constants/roles';
import { I18nTranslations } from '@/i18n/i18n.generated';
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
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (
      !user ||
      !roles.some((role) => user.roles.includes(role as TValueof<typeof ROLES>))
    )
      throw new ForbiddenException(this.i18n.t('index.forbiddenRole'));

    return true;
  }
}

import { I18nTranslations } from '@/generated/i18n.generated';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class SubGuard implements CanActivate {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user;
    if (!user) throw new ForbiddenException(this.i18n.t('index.forbidden'));

    if (!user.sub) throw new ForbiddenException(this.i18n.t('index.subRequire'));

    return true;
  }
}

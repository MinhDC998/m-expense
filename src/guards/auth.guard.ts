import { I18nTranslations } from '@/generated/i18n.generated';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new ForbiddenException(this.i18n.t('index.forbidden'));

    return true;
  }
}

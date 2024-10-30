import { ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

export const I18nConfig = I18nModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE') || 'en',
    loaderOptions: {
      path: path.join(__dirname, '../i18n'),
      watch: true,
    },
    typesOutputPath: path.join(__dirname, '../../src/i18n/i18n.generated.ts'),
  }),
  resolvers: [
    new QueryResolver(['lang']),
    new HeaderResolver(['lang']),
    new CookieResolver(['lang']),
    AcceptLanguageResolver,
  ],
  inject: [ConfigService],
});

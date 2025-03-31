import { NestFactory } from '@nestjs/core';

import { HttpExceptionFilter } from '@/common/filters/validationCustom.filter';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { setupI18n, setupSwagger } from '@/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  setupSwagger(app);
  setupI18n(app);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

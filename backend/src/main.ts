import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = Number(process.env.BACKEND_PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`ATENE event API listening on http://0.0.0.0:${port}/api`);
}
bootstrap();

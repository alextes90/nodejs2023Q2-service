import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from './logger/custom-logger';
import { HttpExceptionFilter } from './exeption-filter/exeption-filter';

async function bootstrap() {
  const customLogger = new CustomLogger();
  const app = await NestFactory.create(AppModule, {
    logger: customLogger,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  process.on('unhandledRejection', (e) =>
    customLogger.error(JSON.stringify(e)),
  );
  process.on('uncaughtException', (e) => customLogger.error(JSON.stringify(e)));

  const options = new DocumentBuilder()
    .setTitle('Home_Library_1')
    .setDescription('Home_Library_application')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();

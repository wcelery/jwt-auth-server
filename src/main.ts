import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MongoExceptionFilter,
  MongooseExceptionFilter,
} from './mongo-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    /* new MongooseExceptionFilter(), */
  );
  await app.listen(3000);
}
bootstrap();

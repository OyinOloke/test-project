import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/response/response.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  const url=process.env.DATABASE_URL
  const PORT=process.env.PORT||3000
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT ?? 3000);
  console.log(url)
}
bootstrap();

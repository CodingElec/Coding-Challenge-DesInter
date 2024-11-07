import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UniqueDigit } from './Domain/UniqueDigit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

let uniqueDigit = new UniqueDigit(9875,4)
console.log(uniqueDigit.getResult())
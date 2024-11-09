import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UniqueDigit } from './Domain/UniqueDigit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('DesInter')
    .setDescription('The DesInter API description')
    .setVersion('1.0')
    .addTag('DesInt')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  app.useGlobalPipes(new ValidationPipe());
  
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

let uniqueDigit = new UniqueDigit(9875,4)
console.log(uniqueDigit.getResult())
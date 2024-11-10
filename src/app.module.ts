import { Module } from '@nestjs/common';
import { AppController } from './Controller/app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UniqueDigitModule } from './UniqueDigit/UniqueDigit.module';

@Module({
  imports: [UserModule, 
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    UserModule,    
    MongooseModule.forRoot(process.env.MONGODB_URI), 
    UniqueDigitModule,
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

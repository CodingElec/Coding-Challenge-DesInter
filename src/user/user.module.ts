import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, } from './schemas/user.schema';
import { UniqueDigitSchema } from '../UniqueDigit/schemas/UniqueDigit.schema';
import { UniqueDigitModule } from 'src/UniqueDigit/UniqueDigit.module';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'UniqueDigit', schema: UniqueDigitSchema }]),
    UniqueDigitModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

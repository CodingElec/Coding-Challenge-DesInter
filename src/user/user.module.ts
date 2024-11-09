import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, } from './schemas/user.schema';
import { UniqueDigitSchema } from './schemas/UniqueDigit.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'UniqueDigit', schema: UniqueDigitSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

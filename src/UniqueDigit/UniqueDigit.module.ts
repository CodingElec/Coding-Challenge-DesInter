import { Module } from '@nestjs/common';
import { UniqueDigitController } from './UniqueDigit.controller';
import { UniqueDigitService } from './UniqueDigit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UniqueDigitSchema } from './schemas/UniqueDigit.schema';
import { CacheService } from './cache/cache.service';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UniqueDigit', schema: UniqueDigitSchema }]),
  ],
  controllers: [UniqueDigitController],
  providers: [UniqueDigitService, CacheService],
  exports: [UniqueDigitService],
})
export class UniqueDigitModule {}

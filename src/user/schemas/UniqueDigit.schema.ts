
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UniqueDigit } from 'src/Domain/UniqueDigit';

export type UniqueDigitrDocument = HydratedDocument<UniqueDigit>;

@Schema()
export class UniqueDigitsch {
    
  @Prop()
  UniqueDigit: number;

   
}

export interface IUniqueDigit extends Document {
    result: number;
  }

export const UniqueDigitSchema  = SchemaFactory.createForClass(UniqueDigit);

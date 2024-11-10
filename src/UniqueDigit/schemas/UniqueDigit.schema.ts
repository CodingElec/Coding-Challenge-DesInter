
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UniqueDigitDocument = HydratedDocument<UniqueDigit>;

@Schema()
export class UniqueDigit {
     
  @Prop()
  result: number;
  @Prop()
  n: number;
  @Prop()
  k:number 

   
}

export interface IUniqueDigit extends Document {
  result: number;  
  n: number;
  k:number 

}

export const UniqueDigitSchema = SchemaFactory.createForClass(UniqueDigit);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IUniqueDigit } from './UniqueDigit.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'UniqueDigit' })
  uniqueDigit: IUniqueDigit;
  
}
export interface IUser extends Document {
    name: string;
    email: string;
    uniqueDigit: IUniqueDigit; // This will reference a UniqueDigit document
  }
export const UserSchema = SchemaFactory.createForClass(User);

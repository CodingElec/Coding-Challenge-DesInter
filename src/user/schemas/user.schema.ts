
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IUniqueDigit } from '../../UniqueDigit/schemas/UniqueDigit.schema';

import { IsOptional } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: [Types.ObjectId], ref: 'UniqueDigit' })
  @IsOptional()
  uniqueDigit: Types.ObjectId[];
  
}
export interface IUser extends Document {
    name: string;
    email: string;
    result: IUniqueDigit; // This will reference a UniqueDigit document
  }
export const UserSchema = SchemaFactory.createForClass(User);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


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

  @Prop()
  @IsOptional()
  publickey: string;

  @Prop()
  @IsOptional()
  isEncrypted: boolean;
  
}

export const UserSchema = SchemaFactory.createForClass(User);

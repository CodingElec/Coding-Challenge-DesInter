import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUniqueDigitResponseDTO {
  @ApiProperty({
    description: 'UniqueDigit Document ID',
    type: String,  // Document ID is represented as a string in JSON format (Mongo ObjectId)
  })
  _id: Types.ObjectId;  // Use Types.ObjectId for better typing

  @ApiProperty({
    description: 'UniqueDigit value',
  })
  @IsNotEmpty()
  @IsNumber()
  result: number;

  @ApiProperty({
    description: 'UniqueDigit parameter n',
  })
  @IsNotEmpty()
  @IsNumber()
  n: number;

  @ApiProperty({
    description: 'UniqueDigit parameter k',
  })
  @IsNotEmpty()
  @IsNumber()
  k: number;
}

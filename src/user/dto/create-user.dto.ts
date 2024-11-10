import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsArray, IsEmail, IsMongoId, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsOptional } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'User Name',
    })
    @IsNotEmpty()
    name:string;


    @ApiProperty({
        description: 'USer Email',
        example: 'jonh.doe@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty({
        description: 'List of Unique Digits (ObjectIds)',
        example: ['60d2f9d73f59b92b4f7d96b8', '60d2f9d73f59b92b4f7d96b9'],  // Example ObjectId values
        type: [String],  // Array of ObjectIds
      })
      @IsOptional()
      @IsArray()
      @IsMongoId({ each: true })  // Validate that each item is a valid Mongo ObjectId
      uniqueDigit: string[];  // Should be an array of strings (ObjectIds)
}

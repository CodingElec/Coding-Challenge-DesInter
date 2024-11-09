import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";

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
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUniqueDigitDto {
    @ApiProperty({
        description: 'UniqueDigit',
    })
    @IsNotEmpty()
    @IsNumber()
    result:number;

    @ApiProperty({
        description: 'UniqueDigit param 1',
    })
    @IsNotEmpty()
    @IsNumber()
    n:number;

    @ApiProperty({
        description: 'UniqueDigit param 2',
    })
    @IsNotEmpty()
    @IsNumber()
    k:number;


   
}

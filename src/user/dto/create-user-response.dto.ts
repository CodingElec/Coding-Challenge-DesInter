import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class CreateUserResponseDTO {
    @ApiProperty({
        description: 'User UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    id: string;


    
}

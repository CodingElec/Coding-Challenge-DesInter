import { ApiProperty } from '@nestjs/swagger';

export class CalculationDto {
  @ApiProperty({
    description: 'The first number for the calculation',
    example: 5,
  })
  n: number;

  @ApiProperty({
    description: 'The second number for the calculation',
    example: 10,
  })
  k: number;
}
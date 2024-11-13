import { Body, Controller, Param, Post } from '@nestjs/common';
import { UniqueDigitService } from './UniqueDigit.service';
import { CalcUniqueDigit } from './CalcUniqueDigit';
import { CreateUniqueDigitDto } from './dto/create.uniqueDigit.dto';




@Controller('uniqueDigit')
export class UniqueDigitController {
  constructor(private readonly uniqueDigitService: UniqueDigitService) {}

  @Post('request')
    requestUniqueDigit(@Body() body: { n: number, k: number }): CalcUniqueDigit {
    const { n, k } = body;    
    return this.uniqueDigitService.requestUniqueDigit(n, k);
  }

  @Post('create')
  async createUniqueID(@Body() body: { n: number, k: number }) {
    
    const { n, k } = body;   

    return this.uniqueDigitService.createUniqueDigit(n,k);
  }
}




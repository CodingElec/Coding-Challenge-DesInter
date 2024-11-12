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
    const uniqueDigit = this.uniqueDigitService.requestUniqueDigit(n, k);
    const result = uniqueDigit.getResult();
      // Prepare the data to be passed to the DTO
      const createUniqueDigitData: CreateUniqueDigitDto = {
        result,  // The result from the CalcUniqueDigit calculation
        n,       // The n parameter
        k        // The k parameter
      }    

    return this.uniqueDigitService.createUniqueDigit(createUniqueDigitData);
  }
}




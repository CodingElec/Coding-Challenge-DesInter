import { Injectable } from '@nestjs/common';
import { CalcUniqueDigit } from './CalcUniqueDigit';
import { Model } from 'mongoose';
import { UniqueDigit } from './schemas/UniqueDigit.schema';
import { CreateUniqueDigitDto } from './dto/create.uniqueDigit.dto';
import { CreateUniqueDigitResponseDTO } from './dto/create.uniqueDigit.response.dto';
import { InjectModel } from '@nestjs/mongoose';




@Injectable()
export class UniqueDigitService {
  
  constructor(
    @InjectModel(UniqueDigit.name) private uniqueDigitModel: Model<UniqueDigit>,
    
  ) {}

  requestUniqueDigit(n:number,k:number):CalcUniqueDigit{
    const result = new CalcUniqueDigit(n,k);
    
    return result;
    
  }

  async createUniqueDigit(n: number,k:number):Promise<CreateUniqueDigitResponseDTO>{
    
    const uniqueDigit = new CalcUniqueDigit(n, k);
    const result = uniqueDigit.getResult();
      // Prepare the data to be passed to the DTO
      const createUniqueDigitData: CreateUniqueDigitDto = {
        result,  // The result from the CalcUniqueDigit calculation
        n,       // The n parameter
        k        // The k parameter
      }    
    
    const createdUniqueDigit = await this.uniqueDigitModel.create(createUniqueDigitData);
    return createdUniqueDigit;
  }

  
}




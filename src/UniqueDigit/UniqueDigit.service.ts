import { Injectable } from '@nestjs/common';
import { CalcUniqueDigit } from './CalcUniqueDigit';
import { Model } from 'mongoose';
import { UniqueDigit } from './schemas/UniqueDigit.schema';
import { CreateUniqueDigitDto } from './dto/create.uniqueDigit.dto';
import { CreateUniqueDigitResponseDTO } from './dto/create.uniqueDigit.response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from './cache/cache.service';





@Injectable()
export class UniqueDigitService {
  
  constructor(
    @InjectModel(UniqueDigit.name) private uniqueDigitModel: Model<UniqueDigit>,
    private readonly cacheService: CacheService
  ) {}

  requestUniqueDigit(n:number,k:number):CalcUniqueDigit{
    const numString = n.toString().repeat(k)

    const cachedResult = this.cacheService.get(numString);
    if (cachedResult) {
      return cachedResult;
    }
    
    const result = new CalcUniqueDigit(numString,k);
    this.cacheService.set(numString, result);
    
    return result;
    
  }

  async createUniqueDigit(n: number,k:number):Promise<CreateUniqueDigitResponseDTO>{
    const numString = n.toString().repeat(k)
    const cachedResult = this.cacheService.get(numString);
    let result = 0;
    if (cachedResult) {
      result = cachedResult
      
      
    } else {
      const uniqueDigit = new CalcUniqueDigit(numString, k);
      result = uniqueDigit.getResult();
      this.cacheService.set(numString, result);
    }
    
    
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




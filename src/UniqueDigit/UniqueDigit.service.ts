import { Injectable } from '@nestjs/common';
import { CalcUniqueDigit } from './CalcUniqueDigit';
import { Model } from 'mongoose';
import { async } from 'rxjs';
import { CreateUserResponseDTO } from 'src/user/dto/create-user-response.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { UniqueDigit } from './schemas/UniqueDigit.schema';
import { CreateUniqueDigitDto } from './dto/create.uniqueDigit.dto';
import { CreateUniqueDigitResponseDTO } from './dto/create.uniqueDigit.response.dto';
import { InjectModel } from '@nestjs/mongoose';




@Injectable()
export class UniqueDigitService {
  static requestUniqueDigit(n: any, k: any): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(UniqueDigit.name) private uniqueDigitModel: Model<UniqueDigit>,
    
  ) {}

  requestUniqueDigit(n:number,k:number):CalcUniqueDigit{
    const result = new CalcUniqueDigit(n,k);
    
    return result;
    
  }

  async createUniqueDigit(createUniqueDigitDto:CreateUniqueDigitDto):Promise<CreateUniqueDigitResponseDTO>{
    
    const createdUniqueDigit = await this.uniqueDigitModel.create(createUniqueDigitDto);
    return createdUniqueDigit;
  }

  
}




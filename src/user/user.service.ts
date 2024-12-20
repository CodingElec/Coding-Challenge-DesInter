import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { get, Model, Types } from 'mongoose';
import { UniqueDigitService } from '../UniqueDigit/UniqueDigit.service';
import { CalculationDto } from './dto/calculate-user.dto';
import { CreateUserResponseDTO } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as crypto from 'crypto';
import * as forge from 'node-forge';


@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>, 
    private readonly uniqueDigitService: UniqueDigitService,
  ) {}
  
  async create(createUserDto: CreateUserDto):Promise<CreateUserResponseDTO> {
    const  createdUser = await this.UserModel.create(createUserDto);
    return createdUser;
   
  }

  async addCalculation(
    id: string,
    calculationParams: CalculationDto
  ): Promise<User> {  
    
    const user = await this.UserModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { n, k } = calculationParams;   
    
    const {_id} = await this.uniqueDigitService.createUniqueDigit(n, k);    
       
    const uniqueDigitId = new Types.ObjectId(`${_id}`);
   
    user.uniqueDigit.push(uniqueDigitId);
   
    return user.save();   
   
  }

  
  async findOne(id: string, privateKey?:string):Promise<User> {

    const user = await this.UserModel
      .findById(id)
      .populate('uniqueDigit', '-_id')  // This will populate the uniqueDigit field with UniqueId documents
      .select('-publickey -isEncrypted')
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.isEncrypted && !privateKey) {

      throw new NotFoundException(`User with ID ${id} is encrypted, private key missing`);

    }
    if (user.isEncrypted && privateKey) {
      const privateKeyFromPem = forge.pki.privateKeyFromPem(privateKey);
      user.name = privateKeyFromPem.decrypt(user.name);
      user.email = privateKeyFromPem.decrypt(user.email);
    }
        
    return user;
  }

  async findCalculations(id: string):Promise<Types.ObjectId[]> {

    const user = await this.UserModel
      .findById(id)
      .select('uniqueDigit')
      .populate('uniqueDigit')  // This will populate the uniqueDigit field with UniqueId documents
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user.uniqueDigit;
  }

   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if the user exists
    const existingUser = await this.UserModel.findById(id);
    if (!existingUser) {
      throw new Error(`User with id ${id} not found`);
    }

    // Update other fields if present in the DTO
    if (updateUserDto.name) {
      existingUser.name = updateUserDto.name;
    }
    if (updateUserDto.email) {
      existingUser.email = updateUserDto.email;
    }

    try {
      if (updateUserDto.uniqueDigit) {
        // Ensure that the uniqueDigit is an array of valid Mongo ObjectIds
        const uniqueDigitObjectIds = updateUserDto.uniqueDigit.map(
          (id) => new Types.ObjectId(id),
        );
        existingUser.uniqueDigit = uniqueDigitObjectIds;
      } 
    } catch (error) {
      // Log or handle the error appropriately
      console.error(error.message);
      
    } 

    // Save the updated user back to the database
    const updatedUser = await existingUser.save();
    return updatedUser;
  }


  async remove(id: string) {
    const user = await this.UserModel
    .findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } 
    return `User #${id} deleted`;
  }

  async encryptUser (id: string) {
    const user = await this.UserModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if(user.isEncrypted) {
      throw new Error('User is already encrypted');
    }
    const key = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    

    user.publickey = forge.pki.publicKeyToPem(key.publicKey);
    user.name = forge.util.encode64(key.publicKey.encrypt(user.name));
    user.email = forge.util.encode64(key.publicKey.encrypt(user.email));
    user.isEncrypted = true;
    //await user.save();
    return user;
  }

  async decryptUser (id: string) {}

  
}




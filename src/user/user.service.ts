import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseDTO } from './dto/create-user-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { CalculationDto } from './dto/calculate-user.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly httpService: HttpService, 
  
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
    

    const { data } = await lastValueFrom(
      this.httpService.post('http://localhost:3000/uniqueDigit/create', { n, k })
    );
    

    // Assuming the response has an 'id' field
    
    const uniqueDigitId = new Types.ObjectId(data.id);

    // Push only the uniqueDigitId to the user's uniqueDigit array
    user.uniqueDigit.push(uniqueDigitId);

    // Save the updated user
    return user.save();   
   
  }

  
  async findOne(id: string):Promise<User> {

    const user = await this.UserModel
      .findById(id)
      .populate('uniqueDigit', '-_id')  // This will populate the uniqueDigit field with UniqueId documents
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
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
}


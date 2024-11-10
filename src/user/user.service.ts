import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseDTO } from './dto/create-user-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}
  
  async create(createUserDto: CreateUserDto):Promise<CreateUserResponseDTO> {
    
    const  createdUser = await this.UserModel.create(createUserDto);
    return createdUser;
   
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string):Promise<User> {

    const user = await this.UserModel
      .findById(id)
      .populate('uniqueDigit')  // This will populate the uniqueDigit field with UniqueId documents
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if the user exists
    const existingUser = await this.UserModel.findById(id);
    if (!existingUser) {
      throw new Error(`User with id ${id} not found`);
    }

    // Handle updating the uniqueDigit field if it exists in the update DTO
    if (updateUserDto.uniqueDigit) {
      // Ensure that the uniqueDigit is an array of valid Mongo ObjectIds
      const uniqueDigitObjectIds = updateUserDto.uniqueDigit.map(
        (id) => new Types.ObjectId(id),
      );
      existingUser.uniqueDigit = uniqueDigitObjectIds;
    }

    // Update other fields if present in the DTO
    if (updateUserDto.name) {
      existingUser.name = updateUserDto.name;
    }
    if (updateUserDto.email) {
      existingUser.email = updateUserDto.email;
    }

    // Save the updated user back to the database
    const updatedUser = await existingUser.save();
    return updatedUser;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseDTO } from './dto/create-user-response.dto';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto):CreateUserResponseDTO {
    const response = new CreateUserResponseDTO()
    response.id = uuidv4() as string
    return response;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

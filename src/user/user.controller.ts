import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CalculationDto } from './dto/calculate-user.dto';

@Controller('user')
export class UserController {
  [x: string]: any;
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {    
    return this.userService.create(createUserDto);
  }

  @Post(':id/calculations')
  async addCalculation(
    @Param('id') id: string,
    @Body() calculationDto: CalculationDto) {          
      return this.userService.addCalculation(id, calculationDto);
  }

  @Post(':id')
  findOne(@Param('id') id: string, @Body() body: { privateKey?: string }) {
    const { privateKey } = body;
    return this.userService.findOne(id, privateKey);
  }
  

  @Get(':id/calculations')
  findCalculations(@Param('id') id: string) {
    return this.userService.findCalculations(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/encrypt')
  async encrypt(
    @Param('id') id: string,
      ) {
   return this.userService.encryptUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}


import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UniqueDigitService } from '../UniqueDigit/UniqueDigit.service'; // Import UniqueDigitService

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserModel = {};  // Mock User model if necessary
  const mockUniqueDigitService = {};  // Mock UniqueDigitService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: UniqueDigitService,
          useValue: mockUniqueDigitService,  // Mock UniqueDigitService
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  const mockUserModel = {
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockUniqueDigitService = {};  // Mock UniqueDigitService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: UniqueDigitService,
          useValue: mockUniqueDigitService,  // Mock UniqueDigitService
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and return the created user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John', email: 'john@example.com',
        uniqueDigit: []
      };
      const createdUser = { ...createUserDto, _id: '123' };
      
      mockUserModel.create.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(createdUser);
      expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const id = '672fdfb16f5bdabc99684ea9';
      const user = { _id: id, name: 'John', email: 'john@example.com', uniqueDigit: [] };
  
      const findByIdMock = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(user),
      });
  
      mockUserModel.findById = findByIdMock;
  
      const result = await service.findOne(id);
       
      expect(result).toEqual(user);
      expect(mockUserModel.findById).toHaveBeenCalledWith(id);
      expect(findByIdMock).toHaveBeenCalledTimes(1);
      expect(findByIdMock().populate).toHaveBeenCalledWith('uniqueDigit', '-_id');
      expect(findByIdMock().exec).toHaveBeenCalledTimes(1);
    });
  });




  describe('update', () => {
    it('should update the user', async () => {
      const id = '123';
      const updateUserDto: UpdateUserDto = { name: 'Updated Name', email: 'updated@example.com' };
      const existingUser = { _id: id, name: 'Old Name', email: 'old@example.com', save: jest.fn() };

      existingUser.save.mockResolvedValue({ ...existingUser, ...updateUserDto });
      mockUserModel.findById.mockResolvedValue(existingUser);

      const result = await service.update(id, updateUserDto);

      expect(result).toEqual({ ...existingUser, ...updateUserDto });
      expect(existingUser.save).toHaveBeenCalled();
    });

    it('should throw an error if user is not found', async () => {
      const id = '123';
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };

      mockUserModel.findById.mockResolvedValue(null);

      await expect(service.update(id, updateUserDto)).rejects.toThrowError(`User with id ${id} not found`);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = '123';
      const user = { _id: id, name: 'John', email: 'john@example.com' };
      mockUserModel.findByIdAndDelete.mockResolvedValue(user);

      const result = await service.remove(id);

      expect(result).toEqual(`User #${id} deleted`);
      expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const id = '123';
      mockUserModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
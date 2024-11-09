import { Test, TestingModule } from '@nestjs/testing';

import { v4 as uuidv4 } from 'uuid';  // Import uuidv4 for validation purposes
import { CreateUserResponseDTO } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';


jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('550e8400-e29b-41d4-a716-446655440000'),  // Mocking uuidv4 to return a consistent value
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a CreateUserResponseDTO with a valid UUID', () => {
      const createUserDto = {} as CreateUserDto;  // Assuming the DTO is not used in this case
      
      // Call the service method
      const result = service.create(createUserDto);
      
      // Check if the result is an instance of CreateUserResponseDTO
      expect(result).toBeInstanceOf(CreateUserResponseDTO);
      
      // Check if the ID is a valid UUID (mocked value)
      expect(result.id).toBe('550e8400-e29b-41d4-a716-446655440000');
      
      // If you were not mocking the UUID, you could do this:
      // expect(result.id).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
    });
  });
});

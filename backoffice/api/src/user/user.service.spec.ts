import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './models/user.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: any;

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
      bulkCreate: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const userDto = {
        name: 'Adeel Tahir',
        firstName: 'Adeel',
        lastName: 'Tahir',
      };
      mockUserRepository.create.mockResolvedValue(userDto);
      expect(await service.create(userDto)).toEqual(userDto);
      expect(mockUserRepository.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('createBulk', () => {
    it('should successfully create multiple users', async () => {
      const usersData = [{ name: 'Adeel Tahir' }, { name: 'Adeel2 Tahir' }];
      mockUserRepository.bulkCreate.mockResolvedValue(usersData);
      await service.createBulk(usersData);
      expect(mockUserRepository.bulkCreate).toHaveBeenCalledWith(usersData);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersArray = [{ name: 'Adeel Tahir' }, { name: 'Adeel2 Tahir' }];
      mockUserRepository.findAll.mockResolvedValue(usersArray);
      expect(await service.findAll()).toEqual(usersArray);
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = { id: 1, name: 'Adeel Tahir' };
      mockUserRepository.findByPk.mockResolvedValue(user);
      expect(await service.findOne(1)).toEqual(user);
      expect(mockUserRepository.findByPk).toHaveBeenCalledWith(1);
    });

    it('should throw an error if no user found', async () => {
      mockUserRepository.findByPk.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const userDto = {
        name: 'Adeel Updated',
        firstName: 'Adeel',
        lastName: 'Tahir',
      };
      const updateResult = [1, [{ id: 1, ...userDto }]];
      mockUserRepository.update.mockResolvedValue(updateResult);
      expect(await service.update(1, userDto)).toEqual(updateResult);
      expect(mockUserRepository.update).toHaveBeenCalledWith(userDto, {
        where: { id: 1 },
        returning: true,
      });
    });

    it('should throw error if user to update is not found', async () => {
      mockUserRepository.update.mockResolvedValue([0, []]);
      await expect(
        service.update(1, {
          name: 'Adeel Updated',
          firstName: 'Adeel',
          lastName: 'Tahir',
        })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Adeel Tahir',
        destroy: jest.fn(),
        firstName: 'Adeel',
        lastName: 'Tahir',
      } as any as User;

      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);
      await service.remove(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockUser.destroy).toHaveBeenCalled();
    });
  });
});

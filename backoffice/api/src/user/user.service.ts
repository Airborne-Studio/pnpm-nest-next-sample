import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserDto } from './dto/user.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    return this.userRepository.create(createUserDto as any);
  }

  async createBulk(usersData: any[]) {
    try {
      await this.userRepository.bulkCreate(usersData); 
    } catch (error) {
      console.error('Error creating users:', error);
      throw error;
    }
  }

  async findAll(options?: any): Promise<User[]> {
    return this.userRepository.findAll(options);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UserDto): Promise<[number, User[]]> {
    const [affectedCount, affectedRows] = await this.userRepository.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      }
    );
    if (affectedCount === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return [affectedCount, affectedRows];
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}

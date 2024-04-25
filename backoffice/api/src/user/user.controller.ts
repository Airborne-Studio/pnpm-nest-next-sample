import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserDto } from './dto/user.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<User> {
    if (createUserDto.age && typeof createUserDto.age !== 'number') {
      createUserDto.age = parseInt(createUserDto.age, 10);
    }
    return this.userService.create(createUserDto);
  }
  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description:
      "Returns a list of all users, You can use query params 'firstName', 'lastName', 'age'",
  })
  async findAll(@Query(ValidationPipe) queryParams?: any): Promise<User[]> {
    const allowedParams = ['firstName', 'lastName', 'age'];
    const validQueryParams = Object.keys(queryParams).filter((key) =>
      allowedParams.includes(key)
    );
    const where = validQueryParams.reduce(
      (acc, key) => ({ ...acc, [key]: queryParams[key] }),
      {}
    );
    return this.userService.findAll({ where });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Returns a user by ID',
  })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post(':id/update')
  @ApiOperation({
    summary: 'Update a user',
    description: 'Updates an existing user by ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto
  ): Promise<[number, User[]]> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Deletes a user by ID',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}

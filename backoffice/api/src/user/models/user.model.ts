import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { UserDto } from '../dto/user.dto';

@Table
export class User extends Model<User, UserDto> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;
}

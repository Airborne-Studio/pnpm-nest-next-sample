import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  address?: string;

  @Column
  phoneNumber?: string;

  @Column
  age?: number;

  @Column
  description?: string;
}

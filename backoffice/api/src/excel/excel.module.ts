import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service'; // Import UserService
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';

@Module({
  controllers: [ExcelController],
  imports: [SequelizeModule.forFeature([User])],
  providers: [ExcelService, UserService], // Include UserService as a provider
})
export class ExcelModule {}

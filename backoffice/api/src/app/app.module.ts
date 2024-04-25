import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { databaseConfig } from '../config';
import { ExcelModule } from '../excel/excel.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), UserModule, ExcelModule],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

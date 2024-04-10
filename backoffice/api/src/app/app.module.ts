import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { databaseConfig } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig)],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { databaseConfig } from '../config';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), UserModule],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

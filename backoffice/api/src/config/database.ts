import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: 'database.sqlite',
  autoLoadModels: true,
  retryAttempts: 1,
};

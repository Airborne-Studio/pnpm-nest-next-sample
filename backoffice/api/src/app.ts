import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';

import { AppModule } from './app/app.module';

interface App {
  expressApp: Express;
  nestApp: INestApplication;
}

export const createApp = async (): Promise<App> => {
  const expressApp = express();
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  nestApp.use(cookieParser());

  nestApp.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Content-Type', 'Content-Disposition'],
  });

  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
    })
  );

  return {
    expressApp,
    nestApp,
  };
};

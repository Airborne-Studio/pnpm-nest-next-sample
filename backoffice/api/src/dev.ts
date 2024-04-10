import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import tcpPortUsed from 'tcp-port-used';

import { createApp } from './app';
import { appPort } from './config';

const setupSwagger = (nestApp: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Airborne Backoffice')
    .setDescription('The Airborne Backoffice API')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(nestApp, swaggerConfig, {
    operationIdFactory(controllerKey, methodKey) {
      return [controllerKey.replace(/Controller$/, ''), methodKey].join('_');
    },
  });

  SwaggerModule.setup('swagger', nestApp, swaggerDocument);
};

const bootstrap = async () => {
  let nestApp;

  // launch the app if its not already running
  const appRunning = await tcpPortUsed.check(appPort, '127.0.0.1');
  if (!appRunning) {
    ({ nestApp } = await createApp());
    setupSwagger(nestApp);
    await nestApp.listen(appPort);
    console.log('Application is running on:', await nestApp.getUrl());
  }
};

bootstrap();

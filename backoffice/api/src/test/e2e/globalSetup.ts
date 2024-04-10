import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../app/app.module';

export interface E2EApp {
  app: INestApplication;
  testModule: TestingModule;
  httpServer: any;
}

export const createE2ETestModule = async (
  providers: ModuleMetadata['providers'] = []
): Promise<E2EApp> => {
  const testModule: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers,
  }).compile();

  const app = testModule.createNestApplication();
  await app.init();

  return { app, testModule, httpServer: app.getHttpServer() };
};

const globalSetup = async () => {
  const { app, httpServer } = await createE2ETestModule();

  // assign global vars for request testing
  globalThis.__APP__ = app;
  globalThis.httpServer = httpServer;
};

export default globalSetup;

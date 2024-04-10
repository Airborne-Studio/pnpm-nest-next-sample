/* eslint-disable no-var */
import { HttpServer, INestApplication } from '@nestjs/common';

declare global {
  namespace globalThis {
    var __APP__: INestApplication;
    var httpServer: HttpServer;
  }
}

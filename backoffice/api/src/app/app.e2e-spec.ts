import { HttpStatus } from '@nestjs/common';
import request from 'supertest';

describe('AppController (e2e)', () => {
  it('/ (GET)', () =>
    request(globalThis.httpServer).get('/').expect(HttpStatus.OK));
});

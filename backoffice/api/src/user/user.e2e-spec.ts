import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../src/app/app.module'; // Adjust the path as necessary

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /users should create a user', async () => {
    const userData = {
      id: 1,
      name: 'Adeel Test',
      firstName: 'Adeel',
      lastName: 'Test',
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .expect(201)
      .expect(({ body }) => {
        expect(body.id).toBeDefined();
        expect(body.name).toEqual(userData.name);
        expect(body.firstName).toEqual(userData.firstName);
        expect(body.lastName).toEqual(userData.lastName);
      });
  });

  it('GET /users should return list of users', async () =>
    request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
      }));

  it('GET /users/:id should return a user', async () => {
    const userId = 1; // Assuming the user with ID 1 exists
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toEqual(userId);
        expect(body.name).toBeDefined();
      });
  });

  it('DELETE /users/:id should remove the user', async () => {
    const userId = 1; // Assuming the user with ID 1 exists for this test
    return request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);
  });
});

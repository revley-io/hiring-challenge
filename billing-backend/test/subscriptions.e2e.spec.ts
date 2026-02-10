import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/subscriptions (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/subscriptions')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/subscriptions (POST)', async () => {
    const payload = {
      product_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      customer_id: '11111111-1111-1111-1111-111111111111',
      price: 15.0,
      status: 'active',
    };

    const response = await request(app.getHttpServer())
      .post('/subscriptions')
      .send(payload)
      .expect(201);

    const body = response.body as {
      id?: string;
      product_id?: string;
      customer_id?: string;
      price?: number;
      status?: string;
    };

    expect(body).toMatchObject({
      product_id: payload.product_id,
      customer_id: payload.customer_id,
      price: payload.price,
      status: payload.status,
    });
    expect(body.id).toBeDefined();
  });
});

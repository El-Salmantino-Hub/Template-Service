import request from 'supertest';
import { app } from '@/server';
import { describe, it } from 'vitest';

describe('GET /ping', () => {
  it('should return a pong', async () => {
    await request(app)
      .get('/ping')
      .expect(200)
      .expect('pong');
  })
})
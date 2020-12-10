const app = require('../lib/app');
const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('comments routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a comment via POST', async() => {
    const res = await request(app)
      .post('/api/v1/comments')
      .send({
        text: 'this is a comment'
      });

    expect(res.body).toEqual({
      id: '1',
      text: 'this is a comment'
    });
  });
});

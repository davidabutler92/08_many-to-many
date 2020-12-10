const app = require('../lib/app');
const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('hashtag routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('should create a hashtag using POST', async() => {
    const res = await request(app)
      .post('/api/v1/hashtags')
      .send({ text: '#ballin' });

    expect(res.body).toEqual({
      id: '1',
      text: '#ballin' 
    });
  });

});

const app = require('../lib/app');
const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Hashtag = require('../lib/models/Hashtag');

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
      .send({ title: '#ballin' });

    expect(res.body).toEqual({
      id: '1',
      title: '#ballin' 
    });
  });

  it('should get all hashtags using GET', async() => {
    const hashtags = await Promise.all([
      { title: '#hello' },
      { title: '#newday' },
      { title: '#alwayssunny' }
    ].map(hashtag => Hashtag.insert(hashtag)));

    const res = await request(app)
      .get('/api/v1/hashtags');

    expect(res.body).toEqual(expect.arrayContaining(hashtags));
    expect(res.body).toHaveLength(hashtags.length);
  });

  it.only('should get a hashtag by ID using GET', async() => {
    const hashtag = await Hashtag.insert({ title: '#code' });

    const res = await request(app)
      .get(`/api/v1/hashtags/${hashtag.id}`);

    expect(res.body).toEqual(hashtag);
  });

});

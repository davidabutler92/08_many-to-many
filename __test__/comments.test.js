const app = require('../lib/app');
const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Comment = require('../lib/models/Comment');

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

  it('should get all comments using GET', async() => {
    const comments = await Promise.all([
      { text: 'first comment' },
      { text: 'second comment' },
      { text: 'third comment' }
    ].map(comment => Comment.insert(comment)));

    const res = await request(app)
      .get('/api/v1/comments');

    expect(res.body).toEqual(expect.arrayContaining(comments));
    expect(res.body).toHaveLength(comments.length);
  });
});

const app = require('../lib/app');
const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Comment = require('../lib/models/Comment');
const Hashtag = require('../lib/models/Hashtag');

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

  it('should get a comment by id', async() => {
    await Promise.all([
      { title: '#sunny' },
      { title: '#rainy' },
      { title: '#cloudy' }
    ].map(hashtags => Hashtag.insert(hashtags)));

    const comment = await Comment.insert({
      text: 'this is a comment!',
      tags: ['#sunny', '#rainy']
    });

    const res = await request(app)
      .get(`/api/v1/comments/${comment.id}`);

    expect(res.body).toEqual({
      ...comment,
      tags: ['#sunny', '#rainy']
    });
  });

  it('should update a comment using PUT', async() => {
    const comment = await Comment.insert({ text: 'holy cow, new comment!' });

    const res = await request(app)
      .put(`/api/v1/comments/${comment.id}`)
      .send({ text: 'holy cow, updated my comment!' });

    expect(res.body).toEqual({ 
      id: comment.id,
      text: 'holy cow, updated my comment!' 
    });
  });

  it('should delete a comment by id', async() => {
    const comment = await Comment.insert({ text: 'holy cow, new comment!' });

    const res = await request(app)
      .delete(`/api/v1/comments/${comment.id}`);

    expect(res.body).toEqual(comment);
  });
});

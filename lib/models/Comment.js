const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  text;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
  }

  // static async insert({ text }) {wd
  
  //   const { rows } = await pool.query(
  //     'INSERT INTO comments (text) VALUES ($1) RETURNING *',
  //     [text]
  //   );
    
  //   return new Comment(rows[0]);
  // }

  static async insert({ text, tags = [] }) {
    const { rows } = await pool.query('INSERT INTO comments (text) VALUES ($1) RETURNING *',
      [text]
    );

    await pool.query(
      `
      INSERT INTO comments_hashtags (comment_id, tag_id)
      SELECT ${rows[0].id}, id FROM hashtags WHERE title = ANY($1::text[])
      `,
      [tags]
    );
    
    return new Comment(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM comments');
    
    return rows.map(comment => new Comment(comment));
  }

  // static async findById(id) {
  //   const { rows } = await pool.query(
  //     'SELECT * FROM comments WHERE id=$1',
  //     [id]
  //   );

  //   if(!rows[0]) throw new Error(`No comment with id ${id}`);
  //   return new Comment(rows[0]);
  // }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        comments.*,
        array_agg(hashtags.title) AS tags
      FROM
        comments_hashtags
      JOIN comments
      ON comments_hashtags.comment_id = comments.id
      JOIN hashtags
      ON comments_hashtags.tag_id = hashtags.id
      WHERE comments.id=$1
      GROUP BY comments.id
      `,
      [id]
    );

    if(!rows[0]) throw new Error(`No comment with the id ${id}`);
    console.log(rows, 'HELLOOO');

    return {
      ...new Comment(rows[0]),
      tags: rows[0].tags
    };
  }

  static async update(id, { text }) {
    const { rows } = await pool.query(
      'UPDATE comments SET text=$1 WHERE id=$2 RETURNING *',
      [text, id]
    );
    if(!rows[0]) throw new Error(`No comment with id ${id}`);
    return new Comment(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id=$1 RETURNING *',
      [id]
    );

    return new Comment(rows[0]);
  }
};

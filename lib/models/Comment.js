const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  text;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
  }

  static async insert({ text }) {
    const { rows } = await pool.query(
      'INSERT INTO comments (text) VALUES ($1) RETURNING *',
      [text]
    );
    
    return new Comment(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM comments');
    
    return rows.map(comment => new Comment(comment));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM comments WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No comment with id ${id}`);
    return new Comment(rows[0]);
  }

  static async update(id, { text }) {
    const { rows } = await pool.query(
      'UPDATE comments SET text=$1 WHERE id=$2 RETURNING *',
      [text, id]
    );
    if(!rows[0]) throw new Error(`No comment with id ${id}`);
    return new Comment(rows[0]);
  }
};

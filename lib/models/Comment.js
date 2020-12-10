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
};

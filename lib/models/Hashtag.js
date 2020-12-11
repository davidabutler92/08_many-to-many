const pool = require('../utils/pool');

module.exports = class Hashtag {
  id;
  title;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  static async insert({ title }) {
    const { rows } = await pool.query('INSERT INTO hashtags (title) VALUES ($1) RETURNING *',
      [title]
    );
    
    return new Hashtag(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM hashtags');

    return rows.map(hashtag => new Hashtag(hashtag));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM hashtags WHERE id=$1',
      [id]
    );

    return new Hashtag(rows[0]);
  }

  static async update(id, { title }) {
    const { rows } = await pool.query(
      'UPDATE hashtags SET title=$1 WHERE id=$2 RETURNING *',
      [title, id]
    );
    
    if(!rows[0]) throw new Error(`No hashtag with id ${id}`);
    return new Hashtag(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM hashtags WHERE id=$1 RETURNING *',
      [id]
    );

    return new Hashtag(rows[0]);
  }
};



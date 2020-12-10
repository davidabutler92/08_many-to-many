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

};



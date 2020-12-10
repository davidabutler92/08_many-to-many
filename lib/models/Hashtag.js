const pool = require('../utils/pool');

module.exports = class Hashtag {
  id;
  text;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
  }

  static async insert({ text }) {
    const { rows } = await pool.query('INSERT INTO hashtags (text) VALUES ($1) RETURNING *');
    [text];
    return new Hashtag(rows[0]);
  }
  
};



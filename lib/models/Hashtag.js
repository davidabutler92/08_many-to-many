const pool = require('../utils/pool');

module.exports = class Hashtag {
  id;
  text;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
  }

  

};

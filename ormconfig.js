const config = require('config');

const { type, host, port, username, password, database } = config.db.pg;

module.exports = {
  type,
  host,
  port,
  username,
  password,
  database,
  "synchronize": false,
  "logging": true,
  "entities": [
    "src/**/**.entity.ts"
  ],
  "migrations": [
    "migration/**/*.ts"
  ],
  "cli": {
    "migrationsDir": "migration"
  }
};

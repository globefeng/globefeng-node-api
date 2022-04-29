const { Client } = require('pg');

const pgClient = new Client({
    host: "chunee.db.elephantsql.com",
    port: 5432,
    user: "ogqflovc",
    password: "xa5qjoMdGtU_dR_1vJ0W3zXns2-5priv",
    database: "ogqflovc"
  });

  module.exports = pgClient;
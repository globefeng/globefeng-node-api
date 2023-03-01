const { Client } = require('pg');

const pgClient = new Client({
    host: "baasu.db.elephantsql.com",
    port: 5432,
    user: "ulrekuuv",
    password: "eV5WWD9nwKpx8rzUTsk3gUwUDhOfV4GM",
    database: "ulrekuuv"
  });

  module.exports = pgClient;
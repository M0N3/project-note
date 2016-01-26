var Postgres = require('./Postgres')("localhost", "postgres", "postgres", "root");

Postgres.exec("SELECT version()", function(result) {
  console.log(result);
});

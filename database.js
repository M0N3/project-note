var postgres = require('./postgres')("localhost", "postgres", "postgres", "root");
var fs = require('fs');

fs.readFile("sql/schema.sql", 'utf-8', function(err, data) {
  if (err)
    console.log("Error reading schema.sql");
  postgres.exec(data);
});

var postgres = require('./postgres')("localhost", "postgres", "postgres", "root");
var fs = require('fs');

fs.readFile("sql/schema.sql", 'utf-8', function(err, data) {
  if (err)
    console.log("Error reading schema.sql");
  postgres.exec(data);
});

module.exports = {
  userById: function(id, callback) {
    postgres.exec("SELECT * FROM \"Users\" WHERE \"id\" = " + id, function(err, result) {
      if (!err)
        callback();
      else {
        if (result.length == 0)
          callback();
        else
          callback(result[0]);
      }
    })
  }
}

var pg = require('pg')


module.exports = function(host, db, user, pass) {
  var conString = "postgres://" + user + ":" + pass + "@" + host + "/" + db;
  console.log(conString);
  return {
    exec: function(query, callback) {
      pg.connect(conString, function(err, client, done) {
        if (err) {
          console.log("PostgreSQL connection error!");
          return;
        }
        client.query(query, [], function(err, result) {
          done();

          if (err)
            console.log("Query error!\n" + err);
          else
            if (callback)
              callback(result.rows);
        })
      })
    }
  }
}

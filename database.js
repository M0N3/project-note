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
  },

  addUser: function(name, password, callback) {
    this.userByName(name, function(userExists) {
      if (!userExists) {
         postgres.exec("INSERT INTO \"User\" (\"Name\", \"Password\") VALUES(\'" + name + "\', \'" + password + "\');", function(err, result) {
         if (!err)
            callback(true);
          else
            callback(false);
        });
      } else
        callback(false);
    })
  },

    getNotes: function(name,callback) {
      console.log(name);
    this.userByName(name, function(user) {
      console.log(name);
      if (user != undefined) {
        console.log("In user req");
         postgres.exec("SELECT * FROM \"Note\" WHERE \"User\"= \'" + user.id + "\' AND \"Private\"= \'" + false + "\'" , function(err, result){
             if (!err){
               postgres.exec("SELECT * FROM \"Tag\" WHERE \"User\"= \'" + user.id + "\'" , function(err, result2){
               callback(result, result2);
          });
             }
          else
            callback(false);
        });
      } else
        callback(false);
    })
    
  },

  userByName: function(name, callback) {
    postgres.exec("SELECT * FROM \"User\" WHERE \"Name\"= \'" + name + "\'", function(err, result) {
      if (err || result.length == 0)
        callback(undefined);
      else
        callback(result[0]);
    })
  },
  
   addNote: function(note, callback) {
    this.userByName(note.author, function(user) {
      var sql = "INSERT INTO \"Note\" (\"User\", \"Title\", \"Content\", \"Date\",\"Private\", \"Number\", \"Color\") VALUES" +
                "(" + user.id + ", \'" + note.title + "\', \'" + note.text + "\', \'" + note.date + "\', " 
                  + !note.access + ", " + note.number + ", \'" + note.color + "\')"; 
      console.log(note);
      postgres.exec(sql, function(err, result) {
          var newTags = note.labels.filter(
            function(a) { 
              return result.map(
                function(row) {
                  return row.Name;
                }).indexOf(a) == -1;
            });
          var tags = newTags.map(function(name) { return "(\'" + name +"\')"; } );
          for(var i = 0; i < tags.length; i++){
            postgres.exec("INSERT INTO \"Tag\" (\"Note\", \"User\", \"TagName\") VALUES " + "(" + note.number + ", " + user.id + ", " 
            + tags[i] + ")", function(err, res) {
          }) 
          }
        callback(!err);
      })
    });
  }
}

var db = require('./database');
var express = require('express');
var app = express();
var router = express.Router();

module.exports = {
  start: function(port) {
    app.listen(port);
    console.log("Server running on port " + port);
  }
}

/*
{
  "key1" : value1,
  key2 : {

  }
}
*/

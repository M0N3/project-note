var db = require('./database');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get("/", function(req, res) {
	console.log("REQUEST");
	res.end("HELLO WORLD!");
});

/*db.userByName("Vasia", function(result) {
	console.log(result);
});*/

app.post("/signin", function(req, res) {
	/* console.log("REQUEST");
	console.log(req.body);*/
	var user = req.body;
	/*var response = {
		name: user.name,
		pass: user.pass
	};*/
	db.userByName(user.name, function(result) {
		if (result && result.Password == user.pass) {
			var response = {
				name: result.Name,
				pass: result.Password
			}
			res.end(JSON.stringify(response));
			console.log("User " + user.name + " authenticated");
		}
	});
	
	console.log(JSON.stringify(user));
	
});

app.put("/registration", function(req, res) {
	var newUser = req.body;
	db.addUser(newUser.name, newUser.pass, function(result) {
	if (result) {
		console.log("User " + newUser.name + " added successfully.");
		res.end(JSON.stringify(newUser));
	}
	else
		console.log("Error adding user");
	});

});




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

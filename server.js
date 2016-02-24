var db = require('./database');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.post("/signin", function(req, res) {
	var user = req.body;
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

app.post("/getnotes", function(req, res) {
	var user = req.body;
	db.userByName(user.name, function(result) {
		if (result) {
			db.getNotes(user.name, function(result2, labels){
				if(result2){
					console.log(labels);
					var response = {
						getnotes: result2,
						getlabels: labels
			}
			res.end(JSON.stringify(response));
				}else{
					console.log("Error get Notes");
				}
			})
		}
	});
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

app.put("/addnote", function(req, res) {
	var note = req.body;
	db.addNote(note, function(result) {
		if (result) {
			console.log("Note added successfully");
			res.end();
		} else {
			console.log("Error adding note");
		}
	});
});

module.exports = {
  start: function(port) {
    app.listen(port);
    console.log("Server running on port " + port);
  }
}

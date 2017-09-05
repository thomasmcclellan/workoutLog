// This uses Nodemon
// It is a utility that will monitor for any changes in your source and automatically restart your server
// Used instead of node to allow that auto restart

// npm install -g nodemon (then)
// nodemon app.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

User.sync();
// User.sync({ force: true }); //DANGER: THIS WILL DROP (DELETE) THE USER TABLE!!!

app.use(bodyParser.json());

// Middleware => CORS (Cross-Origin Resource Sharing)
app.use(require('./middleware/headers'));

//this links with client
app.use('/api/test', function(req, res){
	res.send('Hello World');
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});


app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	//Need to create a user object and use sequelize to put that user into our db

	User.create({
		username: username,
		passwordhash: ''
	}).then(
		//Sequelize is going to return the object it created from db
		function createSuccess(user){
			res.json({
				user: user,
				message: 'create'
			});
		}, 
		function createError(err){
			res.send(500, err.message);
		}
	);
});






















// This uses Nodemon
// It is a utility that will monitor for any changes in your source and automatically restart your server
// Used instead of node to allow that auto restart

// npm install -g nodemon (then)
// nodemon app.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Middleware => CORS (Cross-Origin Resource Sharing)
app.use(require('./middleware/headers'));

//this links with client
app.use('/api/test', function(req, res){
	res.send('Hello World');
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});


// Sequelize
var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'PostgresBear2016!', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function(){
		console.log('connected to workoutlog postgres db');
	}, 
	function(err){
		console.log(err);
	}
);




// Build a user model in sqllize
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING
});

//This does not drop the db, and it helps with data persistence
User.sync();
// User.sync({ force: true }); //DANGER: THIS WILL DROP (DELETE) THE USER TABLE!!!

app.use(bodyParser.json());

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






















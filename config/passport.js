var LocalStrategy = require('passport-local').Strategy;

//load the user model
var Users = require('../models/users');

//exposing this function to out app using module.exports

module.exports = function(passport){

	// passport session setup
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		Users.findById(id, function(err, user){
			done(err, user);
		});
	});

	//local signup
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			 // asynchronous
        	// User.findOne wont fire unless data is sent back
        	Users.findOne({'local.email': email}, function(err, user){
        		if(err) return done(err);

        		//check if the user exists
        		if(user){
        			return done(null, false, 'This email is already in use.');
        		}else{

        			//if there is no user with that email, create a new user
        			var newUser = new Users();
        			newUser.local.email = email;
        			newUser.local.password = newUser.generateHash(password);

        			//save the user
        			newUser.save(function(err, user){
        				if(err) throw err;
        				return done(null, user, 'Registration successful!');
        			});
        		}
        	});
		});
	}));

	//local login
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			Users.findOne({'local.email': email}, function(err, user){
				if(err) return done(err);
				// Showing the same message in both the below cases as we don't want to reveal unnecessary information
				// to someone who is not supposed to know that.  
				// if user not found
				if(!user) return done(null, false, 'Invalid Username or Password!');
				//if user found but the password doesn't match
				if(!user.validPassword(password)) return done(null, false, 'Invalid Username or Password!');

				//if all is well, return the user
				return done(null, user, 'User login successful!');
			});
		});
	}));
}
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

//load the user model
var Users = require('../models/users');

//load the auth configuration

var authConfig = require('./auth');

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

	//facebook login strategy
	passport.use('facebook', new FacebookStrategy({
		clientID: authConfig.facebookAuth.clientID,
		clientSecret: authConfig.facebookAuth.clientSecret,
		callbackURL: authConfig.facebookAuth.callbackURL
	}, function(token, refreshToken, profile, done){

		process.nextTick(function(){
			console.log(token);
			console.log(refreshToken);
			console.log(profile);
			Users.findOne({'facebook.id': profile.id}, function(err, user){
				if(err) return done(err);
				if(user) return done(null, user);
				else{
					var newUser = new User();
					newUser.facebook.id = profile.id;
					newUser.facebook.token = token;
					newUser.facebook.name = profile.name.givenName+ ' '+profile.name.familyName;
					newUser.facebook.email = profile.emails[0].value;

					newUser.save(function(err){
						if(err) return done(err);
						return done(null, newUser);
					});
				}
			});
		});
	}));
}
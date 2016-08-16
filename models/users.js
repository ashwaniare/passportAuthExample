var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

/*var isValidEmail = function(email){
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

var isUserAlreadyThere = function(email, callback){
	Users.find({email_id:email}, function(err, user){
		if(user && user != ''){
			return callback(false);
		}
		return callback(true);
	});
}
var validatiors = {
	emailValidator:[
		{validator: isValidEmail, msg: 'Not a valid Email!'},
		{validator: isUserAlreadyThere, msg: 'User already exists!'}
	]
}*/

//schema for the user model
var userSchema = mongoose.Schema({
	local: {email:String,
		password:String,
		name:String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	twitter: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

//generating a hash
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//checking if the password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('Users', userSchema);

//Create User
/*module.exports.createUser = function(user, callback){
	Users.create(user, callback);
}*/

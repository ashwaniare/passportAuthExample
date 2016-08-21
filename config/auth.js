//configuration for OAUTH2.0

module.exports = {

	facebookAuth:{
		clientID: '', //facebook app ID
		clientSecret: '', //your secret key
		callbackURL: 'http://localhost:3000/auth/facebook/callback' //callback url if granted permission
	}
}
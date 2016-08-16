module.exports = function(app, passport){
    
    app.post('/login', function(req, res, next){
        passport.authenticate('local-login', function(err, user, info){
            if(err) return next(err);
            if(!user) return res.send({success: false, message: info});
            // this is the actual login
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send({success : true, message : info});
            });
        })(req, res, next);
    });


/*app.post('/signup', function(req, res){
    console.log('body parsing '+JSON.stringify(req.body));
});*/

/*app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    })); */
    app.post('/signUp', function(req, res, next){
        passport.authenticate('local-signup', function(err, user, info){
            if(err) return next(err);
            if(!user) return res.send({ success : false, message : info });
            //this is the actual log in
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send({success : true, message : info});
            });
        })(req, res, next);;
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/getProfile', isLoggedIn, function(req, res){
        res.send({success:true, user:req.user});
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    return res.send({success : false, message : 'Session Expired, Please log in again.'});
}

// module.exports = (function() {

// 	Users = require('../models/users');
//     var router = require('express').Router();

//     router.get('/', function(req, res) {
//         res.send('Hello Stranger!!');
//     });
//     router.post('/createUser', function(req, res){
//     	var user = req.body;
//     	Users.createUser(user, function(err, user){
//             var errorMessage = [];
//             console.log(err);
//             if(err){
//                 for(var error in err.errors){
//                     console.log('field name: '+error);
//                     console.log('message: '+err.errors[error].message);
//                     errorMessage.push(err.errors[error].message);
//                 }
//                 return res.json({success:false, errorMessage: errorMessage});
//             }
            
//     		res.json({success:true});
//     	});
//     });

//     return router;
// })();
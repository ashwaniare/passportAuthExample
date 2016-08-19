var app = angular.module('app',['ngRoute']);

/*app.run( function($rootScope, $location) {
   var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope){
   		//initialize a new promise
   		var deferred = $q.defer();

   		//make an ajax call to check if the user is logged in
   		$http.get('/loggedIn').success(function(user){
   			//authenticated
   			if(user !== '0') deferred.resolve();
   			else{
   				// not authenticated
   				$rootScope.message = 'You need to login.';
   				deferred.reject();
   				$location.path('/login');
   			}
   		});
   		return deferred.promise;
   }
});*/

app.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl:'views/landing.html'
	})
	.when('/signup', {
		controller: 'UserController',
		templateUrl: 'views/signup.html'
	})
	.when('/login', {
		controller: 'UserController',
		templateUrl: 'views/login.html'
	})
	.when('/dashboard',{
		controller: 'DashboardController',
		templateUrl: 'views/dashboard.html',
		/*resolve:{
			loggedIn: function(loginServices, $q, $timeout, $http, $location, $rootScope){
				return loginServices.checkLoggedIn($q, $timeout, $http, $location, $rootScope);
			}
		}*/
	})
	.otherwise({
		redirectTo: '/'
	});
});
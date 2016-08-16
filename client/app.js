var app = angular.module('app',['ngRoute']);

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
		templateUrl: 'views/dashboard.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});
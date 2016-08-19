var app = angular.module('app');
/*app.factory('loginServices', ['$q', '$timeout', '$http', '$location', '$rootScope', 
	function($q, $timeout, $http, $location, $rootScope){
		return {
			checkLoggedIn: function($q, $timeout, $http, $location, $rootScope){
   		//initialize a new promise
		   		var deferred = $q.defer();

		   		//make an ajax call to check if the user is logged in
		   		$http.get('/loggedIn').success(function(user){
		   			//authenticated
		   			if(user !== '0') deferred.resolve();
		   			else{
		   				// not authenticated
		   				deferred.reject();
		   				$location.path('/login');
		   			}
		   		});
		   		return deferred.promise;
		   }
		}
}]);*/

app.provider('loginServices', function loginServiceProvider() {

  //the provider recipe for services require you specify a $get function
  this.$get= [function loginServiceFactory(){
     // return the factory as a provider
     // that is available during the configuration phase
     return new loginServices();  
  }]

});

function loginServices(){

	this.checkLoggedIn = function($q, $timeout, $http, $location, $rootScope){
   		//initialize a new promise
		   		var deferred = $q.defer();

		   		//make an ajax call to check if the user is logged in
		   		$http.get('/loggedIn').success(function(user){
		   			//authenticated
		   			console.log('user value::'+user);
		   			if(user !== '0') {
		   				console.log('authenticated');
		   				deferred.resolve();
		   			}
		   			else{
		   				// not authenticated
		   				console.log('not authenticated');
		   				deferred.resolve();
    					$location.path('/');
		   			}
		   		});
		   		return deferred.promise;
		   }
}


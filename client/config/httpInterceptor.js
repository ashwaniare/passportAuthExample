//pushing a custom http interceptor to check the response if the session is not valid then redirect to home.
var app = angular.module('app');
app.config(['$httpProvider', function($httpProvider, $location){  
	$httpProvider.interceptors.push(function($q, $location){
		return {
			response: function(response){
				return response;
			},
			responseError: function(response){
				if(response.status === 401) $location.path('/');
				return $q.reject(response);
			}
		}
	});
}]);
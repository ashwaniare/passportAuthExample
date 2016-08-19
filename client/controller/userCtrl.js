var app = angular.module('app');

app.controller('UserController', ['$scope', '$http', '$location', '$routeParams', 
	function($scope, $http, $location, $routeParams){
		//console.log('loggedIn::',loggedIn);
		console.log('UserController loaded....');
		$scope.createUser = function(){
			var formData = $scope.form;
			$http.post('/signup', formData).success(function(data, status, headers){
				console.log('data', data);
				console.log('status', status);
				if(data.success) return $location.path('/dashboard');
				else{
					$scope.errorMessage = data.message;
					console.log($scope.errorMessage);
				}
			});
		}

		$scope.login = function(){
			console.log('calling');
			var formData = $scope.form;
			$http.post('/login', formData).success(function(data, status, headers){
				console.log('data', data);
				console.log('status', status);
				if(data.success) return $location.path('/dashboard');
				else{
					$scope.errorMessage = data.message;
					console.log($scope.errorMessage);
				}
			});
		}

}]);
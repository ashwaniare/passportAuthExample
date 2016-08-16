var app = angular.module('app');

app.controller('DashboardController', ['$scope', '$location', '$http', '$routeParams', 
	function($scope, $location, $http, $routeParams){
		console.log('DashboardController loaded...');

		var init = (function(){
			$http.get('/getProfile').success(function(response){
				if(response.success) $scope.user = response.user;
				else $location.path('/');
			});
		})();
}]);
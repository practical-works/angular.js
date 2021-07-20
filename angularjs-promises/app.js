application = angular.module("myApp", []);

application.run(function($rootScope, $http, $q) {
	// Run AJAX call on application startup
	// before the creation of controllers
	$rootScope.promise = $http.get("cities.json").then(function(response) {
		console.log(response);
		$rootScope.cities = response.data;
		return $rootScope.cities;
	});
});

application.controller("myCtrl", function($rootScope, $http, $q, $timeout) {
	var ctrl = this;

	// This runs fastly before the response of the AJAX call
	// done on application startup (application.run())
	// therefore, "$rootScope.cities" will be still "undefined"
	// console.log($rootScope.cities);
	// ctrl.cities = $rootScope.cities;

	// Solutions:

	// Solution 1:
	// Wait some time for the AJAX call to finish
	// But in some cases when the call lasts more than the
	// waiting time it won't work and "$rootScope.cities"
	// will be still "undefined"
	// $timeout(function() {
	// 	console.log($rootScope.cities);
	// 	ctrl.cities = $rootScope.cities;
	// }, 100);

	// Solution 2:
	// Watch for "$rootScope.cities" change
	// When it will turn from "undefined" to
	// a defined variable this will trigger
	// $rootScope.$watch("cities", function(newValue) {
	// 	console.log("watching:", newValue);
	// 	ctrl.cities = newValue;
	// });

	// Solution 3:
	// Use the call returned promise
	$rootScope.promise.then(function(result) {
		console.log("promise:", result);
		ctrl.cities = result;
	});

	// --------------------------------------------------
	function rand() {
		var q = $q.defer();
		setTimeout(function() {
			q.resolve(Math.round(Math.random() * 1000));
		}, 2000);
		return q.promise;
	};

	rand().then(function(result) {
		console.log("random number result:", result);
		ctrl.randomNumber = result;
	});
});
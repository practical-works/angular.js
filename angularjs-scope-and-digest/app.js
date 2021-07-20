application = angular.module("myApp", []);

application.controller("mainCtrl", function($scope, $timeout) {

	// "Controller As X" do this (behind the scenes):
	// $scope.X = this;
	// It creates a reference to the controller instance
	// inside the $scope object so everytime we use "this"
	// to store a variable, it will be available in scope
	// (No $scope object needed anymore)

	var vm = this;
	// $scope.$watch(function() { return vm.force % 2 == 0; }, function(newValue, oldValue) {
	// 	console.log(newValue ? "زوجي" : "فردي");
	// });
	// var count = 0;
	// var watchDestroy = $scope.$watch("X.force", function(newValue, oldValue) {
	// 	count++;
	// 	document.title = `[${count}] ${newValue}`;
	// 	if (count == 3) {
	// 		document.title = "It is time :3";
	// 		watchDestroy();
	// 	}
	// });
	var times = 1;
	$scope.$watch(function() {
		console.log(`► Watcher function executed ! (${times})`);
		times++;
	}, function() {
		// console.log("♫ Listner function executed !");
	});
	$timeout(function() {
		console.log("It is time !");
		vm.force = 9000;
		// $scope.$apply();
	}, 100);

	// ==================================================
		// logScopAndThis($scope, this, "mainCtrl");
	// ==================================================
});

application.controller("subCtrl", function($scope) {

	// Access "X" of parent scope (mainCtrl scope)
	// this.mainX = $scope.$parent.X;
	// this.mainX.force = 2019;

	// ==================================================
		// logScopAndThis($scope, this, "subCtrl");
	// ==================================================
});

application.controller("ctrl", function() {
	// this.msg = "Hello";

	// to use the "this" referring the controller inside an object function
	// without confusing it with the "this" referring the object we save it
	// in a variable that we use inside the object instead of "this"
	var vm = this;
	// this.obj = {
	// 	msg: "I am a different msg that belongs to obj",
	// 	random: function() {
	// 		// We could use "this.msg" but it would refer
	// 		// to "obj.msg" not "$scope.c.msg"
	// 		vm.msg = Math.round(Math.random() * 1000);
	// 	}
	// };
});

function logScopAndThis(s, t, ctrlName) {
	console.log("==================================================");
	console.log("♦ " + ctrlName);
	console.log("==================================================");
	console.log("\nthis:");
	console.log(t);
	console.log("\n$scope:");
	console.log(s);
}
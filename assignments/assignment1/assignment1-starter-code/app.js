(function() {

	"use strict";

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);
	
	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		$scope.lunchList = "";
		$scope.message = "";
		$scope.messageClass = "success";

		$scope.checkItems = function() {

			console.log(filterEmpty($scope.lunchList.split(',')));

			var itemsLength = filterEmpty($scope.lunchList.split(',')).length;

			if (itemsLength < 1) {
				$scope.message = "Please enter data first";
				$scope.messageClass = setMessageClass(false);
			}

			else {
				$scope.messageClass = setMessageClass(true);

				if (itemsLength <= 3) {
					$scope.message = "Enjoy!";	
				}
				else {
					$scope.message = "Too much!";
				}
			} 
		};
	}

	function filterEmpty(arr) {
		return arr.filter(function(el) {
			return el.trim().length !== 0;
		}); 
	}

	function setMessageClass(success) {
		return success ? "success" : "danger";
	}

})();
(function () {

	"use strict";

	angular.module('data')
	.service('MenuDataService', MenuDataService);

	MenuDataService.$inject = ['$http'];

	function MenuDataService($http) {
		var $ctrl = this;
		var url = "https://davids-restaurant.herokuapp.com/";

		$ctrl.getAllCategories = function() {
			return $http({url: url + 'categories.json'}).then(function (result) {
				return result.data;
			});
		};

		$ctrl.getItemsForCategory = function(categoryShortName) {
			return $http({url: url + 'menu_items.json?category=' + categoryShortName}).then(function (result) {
				return result.data.menu_items;
			});
		};
	}

})();
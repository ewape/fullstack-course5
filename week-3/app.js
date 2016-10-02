(function () {

	"use strict";

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', foundItems)
	.constant('menuUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json');
	
	MenuSearchService.$inject = ['$http', 'menuUrl'];
	
	function MenuSearchService($http, menuUrl) {
		var service = this;
		service.foundItems = [];

		service.getMatchedMenuItems = function (searchTerm) {
			var foundItems = [];

			return $http({url: menuUrl}).then(function (result) {
			    result.data.menu_items.map(function(el, i) {
			    	if (el.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
			    		foundItems.push(el);
			    	}
			    });

			    service.foundItems = foundItems;
			    return service.foundItems;

			});
		};

		service.removeItem = function(itemIndex) {
			service.foundItems.splice(itemIndex, 1);
		};

		return service;
	}

	NarrowItDownController.$inject = ['$scope', '$http', 'MenuSearchService'];

	function NarrowItDownController($scope, $http, MenuSearchService) {
		var ctrl = this;
		ctrl.searchTerm = "";

		ctrl.getMatchedMenuItems = function() {

			if (ctrl.searchTerm !== "") {
				ctrl.showMessage = false;
				var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

				promise.then(function(response) {
					ctrl.found = response;
					if (ctrl.found.length < 1) {
						ctrl.showMessage = true;
					}
				})
				.catch(function (error) {
				    console.log("Something went terribly wrong.");
				});
			}

			else {
				ctrl.found = [];
				ctrl.showMessage = true;
			}
			
		};

		ctrl.message = "Nothing found";

		ctrl.showMessage = false;

		ctrl.removeItem = function(itemIndex) {
			MenuSearchService.removeItem(itemIndex);
		};

		return ctrl;
	}

	function foundItems() {
		var ddo = {
			scope: {
				found: '<',
				onRemove: '&'
			},
			templateUrl: 'directives/found-items.html'
		};

		return ddo;
	}

})();


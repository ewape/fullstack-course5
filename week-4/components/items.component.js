(function () {

	"use strict";

	angular.module('MenuApp')

	.component('items', {
		templateUrl: 'templates/items.html',
		bindings: {
			items: '<'
		}
	})

	.controller('itemsController', itemsController);

	itemsController.$inject = ['items'];

	function itemsController(items) {
		var ctrl = this;
		ctrl.items = items;
	}

})();
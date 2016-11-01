(function () {

	"use strict";

	angular.module('MenuApp')

	.component('categories', {
		templateUrl: 'templates/categories.html',
		bindings: {
			categories: '<'
		}
	})

	.controller('categoriesController', categoriesController);

	categoriesController.$inject = ['categories'];

	function categoriesController(categories) {
		var ctrl = this;
		ctrl.categories = categories;
	}

})();
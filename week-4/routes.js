(function () {

	"use strict";

	angular.module('MenuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html'
		})

		.state('categories', {
			url: '/categories',
			templateUrl: 'templates/categories.html',
			controller: 'categoriesController as catCtrl',
			resolve: {
				categories: ['MenuDataService', function (MenuDataService) {
					return MenuDataService.getAllCategories();
				}]
			}
		})

		.state('items', {
			url: '/items/{short_name}',
			templateUrl: 'templates/items.html',
			controller: 'itemsController as itemsCtrl',
			resolve: {
		      	items: ['$stateParams', 'MenuDataService',
		            function ($stateParams, MenuDataService) {
		              	return MenuDataService.getItemsForCategory($stateParams.short_name);
		            }
		        ]
		    }
		});
	}

})();
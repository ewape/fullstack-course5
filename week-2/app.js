(function() {
	angular.module('ShoppingListCheckOff', [])
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
	.controller('ShoppingController', ShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController);

	function ShoppingListCheckOffService() {
		var service  = this;

		service.toBuy = [
			{ name: "cookies", quantity: 10 },
			{ name: "sodas", quantity: 4 },
			{ name: "chips", quantity: 6 },
			{ name: "pasta", quantity: 2 },
			{ name: "lolipops", quantity: 15 }
		];

		service.bought = [];

		service.allBought = function() {
			return service.toBuy.length === 0;
		};

		service.nothingBought = service.bought.length === 5;

		service.addToBought = function(index) {
			var item = service.toBuy.splice(index, 1);
			service.bought.push(item[0]);
		};

		return service;
	}

	ShoppingController.$inject = ['ShoppingListCheckOffService'];

	function ShoppingController(ShoppingListCheckOffService) {
		var ctrl = this;
		ctrl.toBuy = ShoppingListCheckOffService.toBuy;
		ctrl.message = ctrl.toBuy.length === 0;
		ctrl.addToBought = function(index) {
			ShoppingListCheckOffService.addToBought(index);
		};
	}

	AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
	
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
		var ctrl = this;
		ctrl.message = ShoppingListCheckOffService.nothingBought;
		ctrl.bought = ShoppingListCheckOffService.bought;
	}

})();

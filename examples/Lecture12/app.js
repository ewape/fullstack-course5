(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController)
.filter('custom', customFilter)
.filter('loves', lovesFilter)
.filter('truth', truthFilter);

MsgController.$inject = ['$scope', '$filter', 'customFilter', 'lovesFilter', 'truthFilter'];

function MsgController($scope, $filter, customFilter, lovesFilter, truthFilter) {
  $scope.name = "Yaakov";
  $scope.stateOfBeing = "hungry";
  $scope.cookieCost = 0.45;

  $scope.sayMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    var output = $filter('uppercase')(msg);
    return output;
  };

  $scope.sayLovesMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    var output = lovesFilter(msg);
    return output;
  };

  $scope.sayTruthMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    var output = truthFilter(msg, "healthy", "unhealthy");
    return output;
  };

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fed";
  };

  $scope.filtered = customFilter($scope.cookieCost);
}

function customFilter() {
  return function(value) {
    return  value * 5;
  };
}

function lovesFilter() {
  return function(input) {
    input = input || '';
    input = input.replace("likes", "loves");
    return input;
  };
}

function truthFilter() {
  return function(input, target, replace) {
    input = input || '';
    input = input.replace(target, replace);
    return input;
  };
}

})();

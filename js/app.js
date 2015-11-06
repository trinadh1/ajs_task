var eshopApp = angular.module('eshopApp', ['ui.router', 'ngStorage']);

//Routes
eshopApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise("/");
 $stateProvider
 .state('home', {
  url: "/",
  templateUrl: "pages/home.html",
  controller: "homeCtrl"
})
 .state('orders', {
  url: "/orders",
  templateUrl: "pages/orders.html",
  controller: "ordersCtrl"
})
}]);

// Service for LocalStorage
eshopApp.service('localStorageService', ['$localStorage', function($localStorage) {
  var localStorageService = this;
  var storage = $localStorage;
  storage.details = storage.details || [];
  localStorageService.details = storage.details
}]);

//Controller for Home page
eshopApp.controller('homeCtrl', ['$scope', '$state', 'localStorageService', function($scope, $state, localStorageService) {
  $scope.orderDetails = function() {
    $state.go('orders');
    var newDetails = {
      amount: $scope.amount,
      contactNumber: $scope.contactNumber,
      address: $scope.address
    };
    localStorageService.details.push(newDetails);
  };
}]);

//Controller for Orders Page
eshopApp.controller('ordersCtrl', ['$scope', '$state', 'localStorageService', function($scope, $state, localStorageService) {
  $scope.showDetails = localStorageService.details;
}]);
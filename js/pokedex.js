var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.factory('ServicePokeOne', ['$resource',function($resource) {
  return $resource("https://pokeapi.co/api/v2/pokemon/:id/");
}]);

pokeApp.controller('controllerpokedex', ['$scope','$log', 'ServicePokeOne', function($scope, $log, ServicePokeOne) {
  
  $scope.data = {
  	listepoke:[
  		{id: '1', name : 'bulbisar'},
  		{id: '2', name: 'salamèche'},
  		{id: '3', name: 'pikachu'},
  		{id: '4', name: 'dracaufeu'}
  ]};

  $scope.validerchoix = function(){
  	$log.log(ServicePokeOne.get({id:$scope.choixpoke}));

  };


}]);


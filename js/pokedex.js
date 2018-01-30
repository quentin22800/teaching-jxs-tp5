var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.factory('ServicePokeOne', ['$resource',function($resource) {
  return $resource("https://pokeapi.co/api/v2/pokemon/:id/");
}]);

pokeApp.factory('ServiceInfoPoke', function() {
    return {value: 1};
});

pokeApp.directive('pokedex', function(){
    return{
        template: '<div ng-include="pokedex.html"></div>'
    }
})
pokeApp.controller('controllerpokedex', ['$scope','$log', 'ServicePokeOne','ServiceInfoPoke' , function($scope, $log, ServicePokeOne, ServiceInfoPoke) {
  
  $scope.data = {
  	listepoke:[
  		{id: '1', name: 'bulbisar'},
  		{id: '2', name: 'salamèche'},
  		{id: '3', name: 'pikachu'},
  		{id: '4', name: 'dracaufeu'}
  ]};

  $scope.validerchoix = function(){
      $scope.pokemon = ServicePokeOne.get({id:$scope.choixpoke}, function(){
          ServiceInfoPoke.value = $scope.pokemon;
        }
      );
  };

}]);

pokeApp.controller('controllerInfoPoke', ['$scope','$log','ServiceInfoPoke', function($scope, $log, ServiceInfoPoke) {
    $scope.ServiceInfoPoke = ServiceInfoPoke;
    $scope.$watch('ServiceInfoPoke.value', function(newVal){
        $scope.pokemoninfo = newVal;
    });

}]);


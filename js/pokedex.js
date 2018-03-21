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
        template: '<div ng-include="\'pokedex.html\'"></div>'
    }
});


pokeApp.controller('controllerpokedex', ['$scope','$log', 'ServicePokeOne','ServiceInfoPoke', '$http' , function($scope, $log, ServicePokeOne, ServiceInfoPoke, $http) {
  
  /*$scope.data = {
  	listepoke:[
  		{id: '1', name: 'bulbisar'},
  		{id: '2', name: 'salamèche'},
  		{id: '3', name: 'pikachu'},
  		{id: '4', name: 'dracaufeu'}
  ]};*/
  $http.get('https://pokeapi.co/api/v2/pokemon/?limit=802&offset=0').then(function(response)
  {
     $scope.listepoke = response.data.results;
     $scope.listepoke.forEach(function(e){ e.id = e.url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','')});
     console.log($scope.listepoke);
  }, function(response){
      console.log(response);
  });

  $scope.validerchoix = function(){
      $scope.pokemon = ServicePokeOne.get({id:$scope.choixpoke}, function(){
          ServiceInfoPoke.value = $scope.pokemon;
        }
      );
      $log.log($scope.pokemon);
  };

}]);

pokeApp.controller('controllerInfoPoke', ['$scope','$log','ServiceInfoPoke', function($scope, $log, ServiceInfoPoke) {
    $scope.ServiceInfoPoke = ServiceInfoPoke;
    $scope.$watch('ServiceInfoPoke.value', function(newVal){
        $scope.pokemoninfo = newVal;
    });

}]);


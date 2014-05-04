'use strict';

// Declare app level module which depends on filters, and services
angular.module('bttr', [
  'ngRoute',
  'bttr.filters',
  'bttr.services',
  'bttr.directives',
  'bttr.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'index.html', controller: 'bttrController'});
}]);
var app = angular.module('myApp', ['ngMaterial', 'md.data.table']);

app.config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';
    
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
}])
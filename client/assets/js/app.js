(function() {
  'use strict';

var app =
  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    //analytics
    'ngSegment',

    // My modules
    'HomeModule',
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', 'segmentProvider'];

  function config($urlProvider, $locationProvider, segmentProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

    segmentProvider
        .setKey('abc')
        .setCondition(function ($rootScope) {
            return $rootScope.isProduction;
        })
        .setDebug(true)
  }

  function run($rootScope, $window) {
    FastClick.attach(document.body);

    $rootScope.user = {};

  }

})();

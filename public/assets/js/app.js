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

(function() {
  'use strict';

  // Define the module
  angular.module('HomeModule', []);

}());

(function(){
  'use strict';
  var controllers;

  HomeCtrl.$inject = ['$scope','$state'];
  function HomeCtrl($scope,$state) {
    /* Controller logic */

  }

  /* Other controllers related to the homecontroller like child controllers */

  controllers = {
    HomeCtrl: HomeCtrl
  };

  angular.module('HomeModule').controller(controllers);
}());

(function() {
'use strict';

}());

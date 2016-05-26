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

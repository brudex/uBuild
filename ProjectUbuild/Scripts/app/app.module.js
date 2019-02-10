(function () {
    angular
        .module('ubuild', ['ngMessages']);

})();




(function () {
    'use strict';
    angular.module("ubuild")
        .controller("AppCtrl", AppCtrl);
    AppCtrl.$inject = ["$scope", "$http", "$timeout", "$rootScope", 'brudexservices', 'brudexutils', '$window'];

    function AppCtrl($scope, $http, $timeout, $rootScope, services, utils, $window) {

        $rootScope.Messages = [
            {
                Id: 0,
                Message: "This is from the client",
                Admin: false,
                Client: true,
                TimeStamp: '11:01 AM | June 9'
            },
            {
                Id: 1,
                Message: "This is from the client",
                Admin: false,
                Client: true,
                TimeStamp: '11:01 AM | June 9'
            },
            {
                Id: 2,
                Message: "This is from the admin",
                Admin: true,
                Client: false,
                TimeStamp: '11:01 AM | June 9'
            },
            {
                Id: 3,
                Message: "This is from the client",
                Admin: false,
                Client: true,
                TimeStamp: '11:01 AM | June 9'
            },
            {
                Id: 4,
                Message: "This is from the Admin",
                Admin: true,
                Client: true,
                TimeStamp: '11:01 AM | June 9'
            }
        ];

    }
})();

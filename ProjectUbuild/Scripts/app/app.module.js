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

        var vm = this;

        getMessageCount();
       


        function getMessageCount() {
            services.getUnreadMessagesCount(function (response) {
                if (response.Status == "00") {
                    $rootScope.messagesCount = response.data;
                }
            });
        }

       
    }
})();

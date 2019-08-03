(function () {
    'use strict';
    angular.module("ubuild")
        .controller("MessagingCtrl", MessagingCtrl);
    MessagingCtrl.$inject = ["$scope", "$http", "$timeout", "$rootScope", 'brudexservices', 'brudexutils', '$window'];
    function MessagingCtrl($scope, $http, $timeout, $rootScope, services, utils, $window) {

        var vm = this;
        vm.ajax = false;

        $scope.init = function () {
            $scope.model = null;
            getMessages();
            markMessagesAsRead();
        };

        
        function getMessages() {
            vm.ajax = true;
            services.getMessageList(function (response) {
                if (response.Status == "00") {
                    vm.ajax = false;
                    var messages = response.data;
                    messages.forEach(function(message) {
                        if (message.Sender == "Bank")
                            message.Admin = true;
                        else message.Client = true;
                    });
                    
//                    angular.forEach(messages,
//                        function (message, index) {
//                            if (message.Sender == "Bank")
//                                message.Admin = true;
//                            else message.Client = true;
//                        });

                    console.log(messages);
                    $rootScope.Messages = messages;
                }
            });
        }
        

        function markMessagesAsRead() {
            setTimeout(function() {
                services.markMessagesAsRead(function (response) {
                    
                });
            }, 1000);
            
        }

        vm.saveMessage = function () {
            services.saveMessage($scope.model,
                function (response) {
                    $scope.init();
                    console.log(response);
                });
        };

        
    } 

})();




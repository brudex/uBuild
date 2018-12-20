(function () {
    'use strict';
    angular.module("ubuild")
        .controller("myApplicationsCtrl", myApplicationsCtrl);
    myApplicationsCtrl.$inject = ["$scope", "$http", "$timeout", "$rootScope", 'brudexservices', 'brudexutils', '$window'];

    function myApplicationsCtrl($scope, $http, $timeout, $rootScope, services, utils, $window) {
        var vm = this;
        vm.ajax = false;
        vm.model = { acceptTerms :false};
        vm.init = function (data) {
            console.log('The data is >>>', data);
            vm.uLain = data.ULAIN;
             if (data.LPS05ClientConfirmation === 3) {
                vm.model.acceptTerms = true;
            }
           
        }
        $scope.$watch("vm.model.acceptTerms",
            function (acceptTerms) {
                console.log(vm.model);
                if (acceptTerms) {
                    swal({
                            title: "Accept Terms and Conditions",
                            text: "Loan Terms and Conditions has been sent to your email. Kindly read and accept before funds are disbursed.",
                            buttons: {
                                cancel: "Cancel",
                                accept: {
                                    text: "Accept Terms",
                                    value: "applyButton"
                                },
                                reject: {
                                    text: "Decline",
                                    value: "declineTerms"
                                }
                            }
                        })
                        .then(function (value) {
                            var payload = { ulain: vm.uLain }
                            switch (value) {
                            case "applyButton":
                                payload.accepted = true;
                                break;
                                case "declineTerms":
                                payload.accepted = false;
                                break;
                                default:
                                    payload.cancelled = true;
                            }
                            vm.ajax = true;
                            if (!payload.cancelled) {
                                services.saveClientConfirmation(payload, function (response) {
                                vm.ajax = false;
                                if (response.Status === "True") {
                                    swal({
                                        title: "Congratulations",
                                        text: "Your confirmation has been received.",
                                        buttons: {
                                            cancel: "Ok"
                                        }
                                    }).then(function (value) {
                                        switch (value) {
                                            default:
                                                $window.location.reload();
                                        }
                                    });
                                    }
                                });
                            }
                            
                        });
                } else {
                    if (vm.uLain) {
                        var payload = { ulain: vm.uLain, accepted :false}
                        console.log('the payload for agreed to terms >>>', payload);
                        services.saveClientConfirmation(payload, function (response) {
                            if (response.Status !== "00") {
                                swal(response.Message);
                            }
                        });
                    }
                    
                }
            });


    }

})();




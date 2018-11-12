(function () {
    'use strict';
    angular.module("ubuild")
        .controller("myApplicationsCtrl", myApplicationsCtrl);
    myApplicationsCtrl.$inject = ["$scope", "$http", "$timeout", "$rootScope", 'brudexservices', 'brudexutils', '$window'];

    function myApplicationsCtrl($scope, $http, $timeout, $rootScope, services, utils, $window) {
        var vm = this;
        vm.ajax = false;
        vm.init = function (data) {
            vm.uLain = data.ULAIN;
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
                            catch: {
                                text: "Accept Terms",
                                value: "applyButton"
                            }
                        }
                    })
                        .then((value) => {
                            switch (value) {
                                case "applyButton":
                                    vm.ajax = true;
                                    services.saveClientConfirmation({
                                        uLain: vm.uLain 
                                    }, function (response) {
                                        vm.ajax = false;
                                        if (response.Status == "True") {

                                            swal({
                                                title: "Congratulations",
                                                text: "Your confirmation has been received.",
                                                buttons: {
                                                    cancel: "Ok"

                                                }
                                            }).then((value) => {
                                                switch (value) {
                                                    default:
                                                        $window.location.reload();
                                                }
                                            });


                                        }
                                    });
                                    break;
                            }
                        });
                }
            });


    }

})();




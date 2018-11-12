(function () {
    'use strict';
    angular.module("ubuild")
        .controller("myApplicationsCtrl", myApplicationsCtrl);
    myApplicationsCtrl.$inject = ["$scope", "$http", "$timeout", "$rootScope", 'brudexservices', 'brudexutils', '$window'];

    function myApplicationsCtrl($scope, $http, $timeout, $rootScope, services, utils, $window) {
        var vm = this;

        $scope.$watch("vm.model.acceptTerms",
            function (acceptTerms) {

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
                                    services.saveClientConfirmation({
                                        uLain: "UB1810310421"
                                    }, function (response) {
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




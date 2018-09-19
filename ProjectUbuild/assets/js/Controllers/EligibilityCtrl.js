"use strict";

/* Controllers */

angular.module("app")
    .controller("EligibilityCtrl", [
        "$scope", "$http", "$timeout", "$rootScope",
        function ($scope, $http, $timeout, $rootScope) {

            $scope.init = function () {
                $scope.builder = {
                    loanType: null,
                    phase:""
                };


            };



            $scope.$watch("builder.loanType",
                function (loantype) {
                    console.log("$scope.builder.loanType", loantype);
                });
            $scope.$watch("builder.loanAmount",
                function (loanAmount) {
                    console.log("$scope.builder.loanAmount", loanAmount);
                });

            $scope.$watch("builder.phase",
                function (phase) {
                    console.log("$scope.builder.phase", phase);
                });

            $scope.$watch("builder.currency",
                function (currency) {
                    if (typeof currency != 'undefined') {
                        $("#loan_monthly_income").ionRangeSlider({
                            min: 1000,
                            max: 100000,
                            type: 'single',
                            step: 100,
                            prefix: currency,
                            maxPostfix: "+",
                            prettify_enabled: false,
                            grid: true
                        });
                        $("#loan_amount").ionRangeSlider({
                            min: 1000,
                            max: 100000,
                            type: 'single',
                            step: 100,
                            prefix: currency,
                            maxPostfix: "+",
                            prettify_enabled: false,
                            grid: true
                        });
                        $("#loan_Irate").ionRangeSlider({
                            min: 1,
                            max: 100,
                            type: 'single',
                            step: 1,
                            from: 12,
                            disable: true,
                            postfix: "%",
                            maxPostfix: "+",
                            prettify_enabled: false,
                            grid: false
                        });
                        $("#loan_Tenure").ionRangeSlider({
                            min: 1,
                            max: 20,
                            from: 12,
                            type: 'single',
                            step: 1,
                            postfix: "years",
                            maxPostfix: "+",
                            prettify_enabled: false,

                        });
                    }
                });

        }
    ]);


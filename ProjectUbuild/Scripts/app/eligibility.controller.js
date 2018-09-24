

(function () {
    'use strict';
    angular.module("ubuild")
        .controller("EligibilityCtrl", EligibilityCtrl);
    EligibilityCtrl.$inject = [ "$scope", "$http", "$timeout", "$rootScope",'brudexservices', 'brudexutils'];
    function EligibilityCtrl($scope, $http, $timeout, $rootScope,services,utils) {
            $scope.init = function () {
                $scope.builder = {
                    loanType: null,
                    phase: ""
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

                        //slider options
                        var monthlyIncomeOptions = {
                            min: 1000,
                            max: 100000,
                            type: 'single',
                            step: 100,
                            prefix: currency,
                            maxPostfix: "+",
                            prettify_enabled: false,
                            grid: true
                        }

                        var loanAmountSliderOptions = {
                            min: 1000,
                            max: 100000,
                            type: 'single',
                            step: 100,
                            prefix: currency,
                            maxPostfix: "+",
                            prettify_enabled: false,
                            grid: true
                        }

                        var loanRateSliderOptions = {
                            min: 1,
                            max: 100,
                            type: 'single',
                            step: 1,
                            from: 12,
                            disable: true,
                            postfix: "%",
                            maxPostfix: "+",
                            prettify_enabled: true,
                            grid: false
                        }

                        var loanTenureSliderOptions = {
                            min: 1,
                            max: 20,
                            from: 12,
                            type: 'single',
                            step: 1,
                            postfix: "years",
                            maxPostfix: "+",
                            prettify_enabled: true,

                        }
                        //instantiate sliders
                        $("#loan_monthly_income").ionRangeSlider();
                        $("#loan_amount").ionRangeSlider();
                        $("#loan_Irate").ionRangeSlider();
                        $("#loan_Tenure").ionRangeSlider();

                        //get slider instances
                        var monthlyIncomeSlider = $("#loan_monthly_income").data("ionRangeSlider");
                        var loanAmountSlider = $("#loan_amount").data("ionRangeSlider");
                        var loanRateSlider = $("#loan_Irate").data("ionRangeSlider");
                        var loanTenureSlider = $("#loan_Tenure").data("ionRangeSlider");

                        monthlyIncomeSlider.update(monthlyIncomeOptions);
                        loanAmountSlider.update(loanAmountSliderOptions);
                        loanRateSlider.update(loanRateSliderOptions);
                        loanTenureSlider.update(loanTenureSliderOptions);
                    }
                });

            $scope.checkEligibility = function () {
                var payload = Object.assign({}, $scope.builder);
                console.log('the payload is >>>', payload);
                services.checkLoanEligibility(payload, function (response) {
                    console.log("the response for eligibility >>", response);
                    if (response.Status === "00") {
                        utils.alertSuccess("Congratulations",response.Message);
                    }else if (response.Status === "01") {
                        utils.alertError("Sorry",response.Message);
                    }
                }); 
            }
            

        }
   

     
})();

 


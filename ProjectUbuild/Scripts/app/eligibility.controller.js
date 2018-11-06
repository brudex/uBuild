(function () {
    'use strict';
    angular.module("ubuild")
        .controller("EligibilityCtrl", EligibilityCtrl);
    EligibilityCtrl.$inject = ["$scope", "$http", "$timeout", "$rootScope", 'brudexservices', 'brudexutils', '$window'];
    function EligibilityCtrl($scope, $http, $timeout, $rootScope, services, utils, $window) {
        var vm = this;
        var isLoanApplication = false;
        var callbackFunc = null;
        $scope.loading = false;
        var interestRates = [];
        var currencies = [];
        vm.loanLimits = [];
        vm.loanLimitsPhase = [];
        $scope.buildingPhases = [];

        $scope.init = function(loanType, callback) {
             
            $scope.builder = {
                loanType: "",
                phase: "",
                loanTenureUnit : 'Years'
            };
            if (loanType) {
                $scope.builder.loanType = loanType;
            }
         };

        $scope.$watch("builder.loanType",
            function (loantype) {
                console.log("$scope.builder.loanType", loantype);
                if (loantype === 'Fullhouse') {
                    $scope.builder.loanTenureUnit = 'Years';
                } else {
                    $scope.builder.loanTenureUnit = 'Months';
                }
                
            });

        

        $scope.$watch("builder.loanAmount",
            function (loanAmount) {
                console.log("$scope.builder.loanAmount", loanAmount);
            });

      //  $scope.$watch("builder.loanTenureUnit",
            //function (unit) {
            //    var loanTenureSlider = $("#loan_Tenure").data("ionRangeSlider");
            //    var loanTenureSliderOptions = {
            //        min: 1,
            //        max: 20,
            //        from: 12,
            //        type: 'single',
            //        step: 1,
            //        postfix: unit,
            //        maxPostfix: "+",
            //        prettify_enabled: true 
            //    }
            //    loanTenureSlider.update(loanTenureSliderOptions); 
           // });
         
        $scope.$watch("builder.phase",
            function (phase) {
                $scope.builder.phaseType = $scope.builder.phase;
                filterLoanAmountLimitsBySelectedCurrency();
            }); 

        $scope.$watch("builder.currency",
            function (currency) {
                if (typeof currency !== 'undefined') {
                    //slider options
                    //var monthlyIncomeOptions = {
                    //    min: 1000,
                    //    max: 100000,
                    //    type: 'single',
                    //    step: 100,
                    //    prefix: currency,
                    //    maxPostfix: "+",
                    //    prettify_enabled: false,
                    //    grid: true
                    //}

                    //var loanAmountSliderOptions = {
                    //    min: 1000,
                    //    max: 100000,
                    //    type: 'single',
                    //    step: 100,
                    //    prefix: currency,
                    //    maxPostfix: "+",
                    //    prettify_enabled: false,
                    //    grid: true
                    //}

                    //var loanRateSliderOptions = {
                    //    min: 1,
                    //    max: 100,
                    //    type: 'single',
                    //    step: 1,
                    //    from: 12,
                    //    disable: true,
                    //    postfix: "%",
                    //    maxPostfix: "+",
                    //    prettify_enabled: true,
                    //    grid: false
                    //}

                    //var loanTenureSliderOptions = {
                    //    min: 1,
                    //    max: 20,
                    //    from: 12,
                    //    type: 'single',
                    //    step: 1,
                    //    postfix: "years",
                    //    maxPostfix: "+",
                    //    prettify_enabled: true,

                    //}
                    ////instantiate sliders
                    //$("#loan_monthly_income").ionRangeSlider();
                    //$("#loan_amount").ionRangeSlider();
                    //$("#loan_Irate").ionRangeSlider();
                    //$("#loan_Tenure").ionRangeSlider();
                   // console.log("the selected currency is >>>", currency);
                    
                   //var interestRate = getInterestRateByCurrency(currency);
                   // loanRateSliderOptions.from = interestRate[0].InterestRate;
                    //get slider instances
                    //var loanTenureSlider = $("#loan_Tenure").data("ionRangeSlider");
                    //var monthlyIncomeSlider = $("#loan_monthly_income").data("ionRangeSlider");
                    //var loanAmountSlider = $("#loan_amount").data("ionRangeSlider");
                    //var loanRateSlider = $("#loan_Irate").data("ionRangeSlider");
                    
                    //monthlyIncomeSlider.update(monthlyIncomeOptions);
                    //loanAmountSlider.update(loanAmountSliderOptions);
                    //loanRateSlider.update(loanRateSliderOptions);
                    //loanTenureSlider.update(loanTenureSliderOptions);
                }
                var interestRate = getInterestRateByCurrency(currency);
                filterLoanAmountLimitsBySelectedCurrency();
            });

        $scope.checkEligibility = function () {
            $scope.loading = true;
            var payload = Object.assign({}, $scope.builder);
            console.log('the payload is >>>', payload);
            services.checkLoanEligibility(payload, function (response) {
                console.log("the response for eligibility >>", response);
                $scope.loading = false;
                if (response.Status === "00") {
                    swal({
                        title: "Congratulations",
                        text: response.Message,
                        buttons: {
                            cancel: "OK",
                            catch: {
                                text: "Apply Now",
                                value: "applyButton"
                            }
                        }
                    })
                    .then((value) => {
                            switch (value) {
                                case "applyButton":
                                    var qstring = $.param(payload);
                                    console.log("Questring >>>", qstring);
                                    $window.location.href = "/loan/apply?" + qstring;
                                    break;
                            }
                        });
                } else if (response.Status === "01") {
                    $scope.loading = false;
                    utils.alertError("Sorry", response.Message);
                }
                if (isLoanApplication && callbackFunc) {
                    $scope.loading = false;
                    var obj = { request: payload, response: response };
                    callbackFunc(obj);
                }
            });
        }

        function getInterestRateByCurrency(currencyCode) {
            var rate= null;
            var selected = currencies.filter(function(item) {
                return item.ISOCode === currencyCode;
            });
            if (selected.length) {
                rate = interestRates.filter(function(item) {
                    return Number(item.LoanCurrencyId) === Number(selected[0].RecordId);
                });
             }
            return rate;
        }

        function getInterestRates() {
            services.getInterestRates(function (response) {
                interestRates = response;  
            });
        }

        function loadLoanAmountLimits() {
            services.getLoanAmountLimits(function (response) {
               console.log("Loan amount limits >>>");
                console.log(response);
                vm.loanLimits = response;
                services.getPhaseLoanTenorLimits(function (response) {
                    console.log("Phase Loan amount limits >>>");
                    console.log(response);
                    vm.loanLimitsPhase = response;
                    filterLoanAmountLimitsBySelectedCurrency();
                });
            });
           
            
        }

        function filterLoanAmountLimitsBySelectedCurrency() {
            var selected;
            if ($scope.builder.loanType === 'Phase') {
                
                selected = vm.loanLimitsPhase.filter(function (item) {
                    return Number(item.ForPhase) === Number($scope.builder.phase);
                });
                console.log('vm.loanLimitsPhase Selected is ', selected);
                if (selected.length) {
                    vm.maxLoanTenure = Number(selected[0].MaxTenorMonths);
                    vm.minLoanTenure = 1;
                }

            } else {
               
                var currency = currencies.filter(function (item) {
                    return item.ISOCode === $scope.builder.currency;
                });
                var currencyId = 0;
                if (currency.length) {
                    currencyId = currency[0].RecordId;
                }
                selected = vm.loanLimits.filter(function (item) {
                    return Number(item.LoanCurrencyId) === currencyId;
                });
                
                if (selected.length) {
                    vm.maxLoanTenure = Number(selected[0].MaxTenorMonths) / 12;
                    vm.minLoanTenure = 1;
                }
            }  
        }



         

        $scope.getTenureRange = function () {
            var ranges = [];
            for (var k = 1; k <= vm.maxLoanTenure; k++) {
                ranges.push(k);
            }
            return ranges;
        }

        function getCurrencies() {
            services.getCurrencies(function (response) {
                currencies = response;
             });
        } 

        function getPhaseTypes() {
            services.getBuildingPhases(function (response) {
                console.log("Phase types >>", response);
                $scope.buildingPhases = response;
            });
        }

        getInterestRates();
        getCurrencies();
        getPhaseTypes();
        loadLoanAmountLimits();
    } 

})();




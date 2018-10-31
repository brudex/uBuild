﻿(function() {
    'use strict';
    angular
        .module('ubuild')
        .controller('LoanApplicationController', LoanApplicationController);
    LoanApplicationController.$inject = ['brudexservices', '$location', '$window', 'brudexutils'];
    function LoanApplicationController(services,location,$window,utils) {
        var vm = this;
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.requests = [];
        vm.houseImages = [];
        vm.fixtureFittings = [];
        vm.applyModel = {}
        vm.eligibilityCallback = getEligibilityValues;
        vm.submitLoanApplication = submitLoanApplication;
        vm.getHouseCustomizables = getHouseCustomizables;
        vm.buildingPhases = [];
        vm.repaymentMethods = [];
        vm.currencies = [];
        vm.customizables = [];
        vm.applyModel.eligible = false;
        vm.ulain = "";
        vm.applyModel.currency = 1;
        vm.applyModel.loanTenureUnit = "Years";

        function getHouseImages(){
            var payload = { requestType :1};
            services.getHouseImages(payload, function (response) {
                if (response.status === '00') {
                    vm.houseImages = response.data;
                }
            });
        }


        function getHouseCustomizables(houseId) {
            services.getHouseCustomizables(houseId, function (response) {
                console.log("Result from customizables >>", response);
                vm.customizables = response; 
            });
        }
          
        function getHouseFixtures() {
            var payload = { requestType: 1 };
            services.gitFixturesFittings(payload, function (response) {
                if (response.status === '00') {
                    vm.fixtureFittings  = response.data;
                }
            });
        }

        function getEligibilityValues(data) {
            console.log("eligibility callback >>", data);
            if (data.response.Status === "00") {
                vm.applyModel.eligible = true;
                services.getAccountProfile({}, function (response) {
                     if (response.Status === "00") {
                        console.log("response status is success >>");
                        vm.applyModel.FullName = response.data.fullName;
                        vm.applyModel.accountNumber = response.data.accountNumber;
                        vm.applyModel.customerNo = response.data.customerNo;
                        vm.applyModel.applyingFor = data.request.loanType;
                        vm.applyModel.forPhase = data.request.loanType;
                        vm.applyModel.AmtSought = data.response.data.LoanAmount;
                        vm.applyModel.RepaymentMethod = "";
                        vm.applyModel.RepaymentOther = "";
                        vm.applyModel.PurposeofLoan = "";
                        vm.applyModel.loanTenure = data.request.loanTenure;
                        vm.applyModel.loanTenureUnit = "years";
                        vm.applyModel.ProtectionCover = false;
                        vm.applyModel.ProtectionSecured = false;
                        vm.applyModel.ProtectionSecurityType = "";
                        vm.applyModel.ProtectionSecurityDetails = "";
                        vm.applyModel.currency = data.request.currency; 
                        console.log("The applyModel >> ",vm.applyModel);
                    }                    
                });
            } else {
                vm.applyModel.eligible = false;
            }
        }

        function submitLoanApplication() {
            var payload = vm.applyModel;
            services.applyForLoan(payload, function (response) {
                console.log("Response from applyForLoan >>", response);
                if (response.Status === "00") {
                    vm.ulain = response.Message;
                    utils.alertSuccess("Loan successfully submitted. Your ULAIN information is " + response.Message);
                } else {
                    utils.alertError(response.Message);
                }
            });
        }

        function getPhaseTypes() {
            services.getBuildingPhases(function (response) {
                console.log("Phase types >>", response);
                vm.buildingPhases = response;
            });
        }

        function getRepaymentMethods() {
            services.getRepaymentMethods(function (response) {
                console.log('the repayment methods >>>', response);
                 vm.repaymentMethods = response;
            });
        }

        function getCurrencies() {
            services.getCurrencies(function (response) {
                console.log('the repayment methods >>>', response);
                vm.currencies = response;
            });
        }
         
        
        function translateVals() {
            if ($window.loanVals) {
                vm.applyModel.AmtSought = $window.loanVals.loanAmount;
            vm.applyModel.loanTenure = $window.loanVals.loanTenure;
            vm.applyModel.currency = Number($window.loanVals.currencyId);
            console.log('The currency is >>>', vm.applyModel.currency);
            vm.applyModel.loanTenureUnit = "Years";
                if ($window.loanVals.loanType === "Fullhouse") {
                    vm.applyModel.applyingFor = "1";
                } else {
                    vm.applyModel.applyingFor = "2";
                }
            }
            
        }

        getRepaymentMethods();
        translateVals();
        getPhaseTypes();
        getCurrencies();

    }
})();
 
(function() {
    'use strict';
    angular
        .module('ubuild')
        .controller('LoanApplicationController', LoanApplicationController);
    LoanApplicationController.$inject = ['brudexservices','$location'];
    function LoanApplicationController(services,location) {
        var vm = this;
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.requests = [];
        vm.houseImages = [];
        vm.fixtureFittings = [];
        vm.applyModel = {}
        vm.eligibilityCallback = getEligibilityValues;
        vm.applyModel.eligible = false;

        function getHouseImages() {
            var payload = { requestType :1};
            services.getHouseImages(payload, function (response) {
                if (response.status === '00') {
                    vm.houseImages = response.data;
                }
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
            if (data.response.Status === "00") {
                vm.applyModel.eligible = true;
                services.getAccountInfo({}, function (response) {
                    if (response.Status === "00") {
                        vm.applyModel.FullName = response.data.fullName;
                        vm.applyModel.accountNumber
                        vm.applyModel.customerNo
                        vm.applyModel.applyingFor
                        vm.applyModel.forPhase
                        vm.applyModel.AmtSought
                        vm.applyModel.RepaymentMethod
                        vm.applyModel.RepaymentOther
                        vm.applyModel.PurposeofLoan
                        vm.applyModel.loanTenure
                        vm.applyModel.loanTenureUnit
                    }
                    
                });
            } else {
                vm.applyModel.eligible = false;
            }
        }

        
    }
})();
 
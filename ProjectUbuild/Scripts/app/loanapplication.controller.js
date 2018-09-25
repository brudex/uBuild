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
        vm.submitLoanApplication = submitLoanApplication;
        vm.applyModel.eligible = false;
        vm.ulain = "";

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
            console.log("eligibility callback >>", data);
            if (data.response.Status === "00") {
                vm.applyModel.eligible = true;
                services.getAccountProfile({}, function (response) {
                    console.log("Response from getAccount >>", response);
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
                     
                }
            });
        }

        
    }
})();
 
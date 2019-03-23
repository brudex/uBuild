(function () {
    'use strict';
    angular
        .module('ubuild')
        .controller('LoanApplicationController', LoanApplicationController);
    LoanApplicationController.$inject = ['brudexservices', '$location', '$window', 'brudexutils'];
    function LoanApplicationController(services, location, $window, utils) {
        var vm = this;
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.requests = [];
        vm.houseImages = [];
        vm.fixtureFittings = [];
        vm.applyModel = {}
        vm.submitLoanApplication = submitLoanApplication;
        vm.getHouseCustomizables = getHouseCustomizables;
        vm.buildingPhases = [];
        vm.repaymentMethods = [];
        vm.currencies = [];
        vm.customizables = [];
        vm.applyModel.eligible = false;
        vm.ulain = "";
        vm.ajax = false;
        vm.applyModel.currency = 1;
        vm.formSubmitted = false;

        function getHouseImages() {
            vm.ajax = true;
            var payload = { requestType: 1 };
            services.getHouseImages(payload, function (response) {
                vm.ajax = false;
                if (response.status === '00') {
                    vm.houseImages = response.data;
                }
            });
        }


        function getHouseCustomizables(houseId) {
            vm.ajax = true;
            services.getHouseCustomizables(houseId, function (response) {
                vm.ajax = false;
                console.log("Result from customizables >>", response);
                vm.customizables = response;
            });
        }

        function getHouseFixtures() {
            vm.ajax = true;
            var payload = { requestType: 1 };
            services.gitFixturesFittings(payload, function (response) {
                vm.ajax = false;
                if (response.status === '00') {
                    vm.fixtureFittings = response.data;
                }
            });
        }

        function getEligibilityValues() {
            vm.applyModel.eligible = true;
            services.getAccountProfile({}, function (response) {
                if (response.Status === "00") {
                    console.log("response status is success >>");
                    vm.applyModel.FullName = response.data.fullName;
                    vm.applyModel.accountNumber = response.data.accountNumber;
                    vm.applyModel.customerNo = response.data.customerNo;
                    console.log("The applyModel >> ", vm.applyModel);
                }
            });
        }

        function submitLoanApplication(valid) {
            console.log('the apply model is >>>', vm.applyModel);
            console.log('form is valid is >>>',valid);

            vm.formSubmitted = true;
            if (!valid) {
                return;
            }
            if (!vm.applyModel.applyingFor) {
                utils.toastError('Select type of loan you are Applying For');
                console.log('applying for not selected');
                return;
            }
            vm.ajax = true;
            var payload = vm.applyModel;
            services.applyForLoan(payload, function (response) {
                console.log("Response from applyForLoan >>", response);
                vm.ajax = false;
                if (response.Status === "00") {
                    vm.ulain = response.Message;
                    swal({
                        title: "Congratulations",
                        text: "Your application has been received . Your ULAIN is : " + vm.ulain,
                        buttons: {
                            cancel: "OK",
                            catch: {
                                text: "Submit Supported Documents",
                                value: "submitDocs"
                            }
                        }
                    })
                        .then(function (value) {
                            switch (value) {
                                case "submitDocs":
                                    $window.location.href = "/loan/LoanDocs?clientUlain=" + vm.ulain;
                                    break;
                                default:
                                    $window.location.href = "/Home/MyApplications";
                                    break;
                            }
                        });

                } else {
                    utils.alertError(response.Message);
                }
            });
        }

        function getPhaseTypes() {
            services.getBuildingPhases(function (response) {
                console.log("Phase types >>", response);
                vm.buildingPhases = response;

                angular.forEach(vm.buildingPhases,
                    function (item, index) {
                        console.log("item", item);
                        if (item.RecordId == vm.applyModel.forPhase)
                            vm.applyModel.PurposeofLoan = item.PhaseName;
                    });
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
                if ($window.loanVals.customerNo) {
                    vm.applyModel.customerNo = $window.loanVals.customerNo;
                }
                vm.applyModel.FullName = $window.loanVals.fullName;
                vm.applyModel.accountNumber = $window.loanVals.accountNumber;
                vm.applyModel.customerNo = $window.loanVals.customerNo;
                vm.applyModel.currency = Number($window.loanVals.currencyId);
                vm.applyModel.loanTenureUnit = "Years";
                if ($window.loanVals.loanType === "Fullhouse") {
                    vm.applyModel.applyingFor = "1";
                } else {
                    vm.applyModel.applyingFor = "2";
                    vm.applyModel.forPhase = Number($window.loanVals.phaseType); 
                    console.log("vm.applyModel.forPhase", vm.applyModel.forPhase);
                }
            }

        }

        getRepaymentMethods();
        translateVals();
        getPhaseTypes();
        getCurrencies();

    }
})();

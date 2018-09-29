(function() {
    'use strict';

    angular.module('ubuild')
        .controller('HouseDesignController', HouseDesignController);
    HouseDesignController.$inject = ['brudexservices', '$location', '$scope'];

    function HouseDesignController(services, location, $scope) {

        

        var vm = this;

        vm.init = function () {

        };

        vm.errorMsg = [];
        vm.successMsg = [];
        vm.requests = [];
        vm.houseImages = [];
        vm.fixtureFittings = [];
        vm.applyModel = {}
       
        vm.customizables = [];
        vm.applyModel.eligible = false;
        vm.ulain = "";

        $scope.$watch("vm.itemSelected",
            function(newValue) {
                console.log("vm.itemSelected", vm.itemSelected);
            });


        function getEligibilityValues(data) {
            console.log("eligibility callback >>", data);
            if (data.response.Status === "00") {
                vm.applyModel.eligible = true;
                services.getAccountProfile({},
                    function(response) {
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
                            console.log("The applyModel >> ", vm.applyModel);
                        }
                    });
            } else {
                vm.applyModel.eligible = false;
            }
        }


    }


})();

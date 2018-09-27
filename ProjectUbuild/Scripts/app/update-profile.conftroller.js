(function () {
    'use strict';
    angular
        .module('ubuild')
        .controller('UpdateProfileController', UpdateProfileController);
    UpdateProfileController.$inject = ['brudexservices', 'brudexutils','$scope'];
    function UpdateProfileController(services, utils,$scope) {
        var vm = this;
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.profile = {};
        vm.formSubmitted = false;
        vm.isReadonly = true;
        vm.profile.tokenSent = false;
        var tokenValidated = false;
        $scope.$watch("vm.profile.IsAccountHolder",
            function(newValue) {
                if (newValue == "No")
                    vm.isReadonly = false;
            });

        vm.submitProfile = function (formValid) {
            console.log('form is valid', formValid);
            vm.formSubmitted = true;
            if (formValid) {
                services.submitProfile(vm.profile, function (response) {
                    console.log("Response from server >>", response);
                    if (response.status === "00") {
                        utils.alertSuccess(response.message);
                    }
                });
            } 
        }

        vm.sendToken = function () {
            var payload = { acctNo: vm.profile.AccountNumber };
            services.sendTokenByAcctNo(payload, function(response) {
                if (response.Status === "00") {
                    utils.alertSuccess(response.Message);
                    vm.profile.tokenSent = true;
                } else {
                    utils.alertError(response.Message);
                }
            });
        }  

        vm.validateToken = function () {
            if (!tokenValidated) {
                var payload = { acctNo: vm.profile.AccountNumber, token: vm.profile.TokenSMS };
                services.validateTokenByAcctNo(payload, function (response) {
                    console.log("response from validate token ...", response);
                    if (response.Status === "00") {
                        utils.alertSuccess(response.Message);
                        vm.isReadonly = false;
                        tokenValidated = true;
                        getAccountInfo();
                    } else {
                        utils.alertError(response.Message);
                    }
                });
            } else {
                alert("Click continue");
            } 
        }

        function getAccountInfo() {
            console.log('getting account information >>>');
            var payload = { allData: true };
            services.getAccountProfile(payload, function (response) {
                console.log("Account information is >>", response);
                if (response.Status === "00") {
                    Object.assign(vm.profile, response.data);
                }
            });
        }
    }
})();

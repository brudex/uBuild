﻿(function () {
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
        vm.ajax = false;
        $scope.$watch("vm.profile.IsAccountHolder",
            function(newValue) {
                if (newValue == "No")
                    vm.isReadonly = false;
                else
                    vm.isReadonly = true;
            });

        vm.submitProfile = function (formValid) {
            console.log('form is valid', formValid);
            vm.formSubmitted = true;
            if (formValid) {
                vm.ajax = true;
                services.submitProfile(vm.profile, function (response) {
                    console.log("Response from server >>", response);
                    if (response.Status === "00") {
                        utils.alertSuccess(response.Message);
                    }
                    vm.ajax = false;
                });
            } 
        }

        vm.sendToken = function () {
            var payload = { acctNo: vm.profile.AccountNumber };
            vm.ajax = true;
            services.sendTokenByAcctNo(payload, function(response) {
                if (response.Status === "00") {
                    utils.alertSuccess(response.Message);
                    vm.profile.tokenSent = true;
                } else {
                    utils.alertError(response.Message);
                }
                vm.ajax = false;
            });
        }  

        vm.validateToken = function () {
            if (!tokenValidated) {
                vm.ajax = true;
                var payload = { acctNo: vm.profile.AccountNumber, token: vm.profile.TokenSMS };
                services.validateTokenByAcctNo(payload, function (response) {
                    console.log("response from validate token ...", response);
                    if (response.Status === "00") {
                        utils.alertSuccess(response.Message);
                        vm.isReadonly = false;
                        tokenValidated = true;
                        getAccountInfo(payload.acctNo);
                    } else {
                        utils.alertError(response.Message);
                    }
                    vm.ajax = false;
                });
            } else {
                alert("Click continue");
            } 
        }

        function getAccountInfo(acctNo) {
            console.log('getting account information >>>');
            vm.ajax = true;
            var payload = { allData: true };
            if (acctNo) {
                payload.acctNo = acctNo;
            }
            services.getAccountProfile(payload, function (response) {
                console.log("Account information is >>", response);
                if (response.Status === "00") {
                    Object.assign(vm.profile, response.data);
                }
                vm.ajax = false;
            });
        }

        function formatProfileData () {
            vm.profile.Gender = vm.profile.Gender.upper()[0];
        }
    }
})();

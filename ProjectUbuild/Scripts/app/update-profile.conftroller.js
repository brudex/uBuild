(function () {
    'use strict';
    angular
        .module('ubuild')
        .controller('UpdateProfileController', UpdateProfileController);
    UpdateProfileController.$inject = ['brudexservices', 'brudexutils'];
    function UpdateProfileController(services, utils) {
        var vm = this;
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.profile = {};
        vm.formSubmitted = false;

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
    }
})();

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

(function () {
    'use strict';
    angular
        .module('ubuild.app')
        .controller('UpdateProfileController', UpdateProfileController);
    UpdateProfileController.$inject = ['brudexservices', '$location'];
    function UpdateProfileController(services, location) {
        var vm = this;
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.profile = {};
        vm.formSubmitted = false;

        vm.submitProfile = function () {
            services.submitProfile(vm.profile, function(response) {
                if (response.status === "00") {
                    
                }
            }); 
        }


    }
})();

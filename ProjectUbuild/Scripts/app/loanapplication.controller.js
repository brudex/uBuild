(function() {
    'use strict';
    angular
        .module('ubuild.app')
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

        
    }
})();
 
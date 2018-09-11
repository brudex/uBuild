(function() {
    'use strict';
    angular
        .module('ubuild.app')
        .controller('ChequebookRequestListController', ChequebookRequestListController);
    ChequebookRequestListController.$inject = ['brudexservices','$location'];

    function ChequebookRequestListController(services,location) {
        var vm = this;
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.requests = [];
        
        function getRequests() {
            var payload = { requestType :1};
            services.getChequeBookRequests(payload, function (response) {
                if (response.status === '00') {
                    vm.requests = response.data;
                }

            });
        }
          

        getRequests();
    }
})();
 
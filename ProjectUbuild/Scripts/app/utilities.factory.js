(function () {
    angular
        .module('ubuild')
        .factory('brudexutils', UtilityFunctions);
    UtilityFunctions.$inject = ['$http', '$location', '$window'];
    function UtilityFunctions($http, $location,$window) {
         return {
            alertSuccess: createAlert('success'),
            alertError: createAlert('error')
           
        }; 
        function createAlert(alertType) {
            return function showAlert(title, message) {
                var args = [].slice.call(arguments);
                if (args.length === 1) {
                    message = args[0];
                    title = "Success";
                }
                $window.swal(title, message, alertType);
            } 
        }
        

    }
})();
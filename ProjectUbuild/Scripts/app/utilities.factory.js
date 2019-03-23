(function ($) {
    angular
        .module('ubuild')
        .factory('brudexutils', UtilityFunctions);
    UtilityFunctions.$inject = ['$http', '$location', '$window'];
    function UtilityFunctions($http, $location,$window) {
         return {
            alertSuccess: createAlert('success'),
            alertError: createAlert('error'),
            toastError: createToast('error'),
            toastSuccess: createToast('success')
        }; 
        function createAlert(alertType) {
            return function showAlert(title, message) {
                var args = [].slice.call(arguments);
                if (args.length === 1) {
                    message = args[0];
                    title = alertType;
                }
                $window.swal(title, message, alertType);
            } 
        }
        function createToast(alertType) {
            return function showAlert( message) {

                window.toastr[alertType](message);
            } 
        }
        

    }
})(window.jQuery);
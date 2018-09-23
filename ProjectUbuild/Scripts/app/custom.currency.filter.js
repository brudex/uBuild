(function () {
    'use strict';

    angular
        .module('ubuild')
        .filter('customCurrency', customCurrencyFilter);
    customCurrencyFilter.$inject = ['$filter'];
    function customCurrencyFilter($filter) {
            return function (amount, currencySymbol) {
                var currency = $filter('currency');
                if (amount.charAt(0) === "-") {
                    return currency(amount, currencySymbol)
                        .replace("(", "-")
                        .replace(")", "");
                }
                return currency(amount, currencySymbol).replace(",", ", ");
            }; 
    }
   
})();

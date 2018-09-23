(function () {
    angular
   .module('ubuild.app', [
       'ngAnimate',
       'ui.router',
       'nya.bootstrap.select'
   ]).config(Configure);
    Configure.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Configure($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/dashboard");
        // Now set up the states
        $stateProvider
            .state('changepassword', {
                url: "/changepassword",
                templateUrl: "/Partials/Users/change-password.html",
                controller: 'ChangePassword',
                controllerAs: 'vm'
            }).state('changepin', {
                url: "/changepin",
                templateUrl: "/Partials/Users/change-pin.html",
                controller: 'ChangePin',
                controllerAs: 'vm'
            }).state('account-summary', {
                url: "/account-summary",
                templateUrl: "/Partials/Account/account-summary.html",
                controller: 'AccountSummary',
                controllerAs: 'vm'
            });
    }

})();

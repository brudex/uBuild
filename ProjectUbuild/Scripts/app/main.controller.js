(function () {
    'use strict';
    angular
    .module('ubuild.app')
    .controller('MainController', MainController);
    MainController.$inject = ['brudexservices'];
    function MainController(services) {
        var vm = this;
        vm.model = {};

        console.log("232323");
    }
})();
 
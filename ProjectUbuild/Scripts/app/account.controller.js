(function () {
    'use strict';
    angular
    .module('ubuild')
    .controller('AccountControler', AccountControler);
    AccountControler.$inject = ['brudexservices'];
    function AccountControler(services) {
        var vm = this;
        vm.loginModel = { accessToken: "", userName: "", password: "" };
        vm.formSubmitted = false;
        vm.submitMessage = "";
        vm.messageClass = "alert-success";
        vm.loginUserSoft = function (valid) {
            vm.formSubmitted = true;
            services.loginUserSoft(function (response) {
                console.log(response);
                if (response.status === "00") {
                    toastr.success("Login Successfull");
                }
            });
        };
    }
})();
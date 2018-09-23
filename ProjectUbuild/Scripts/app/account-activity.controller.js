(function () {
    'use strict';
     angular
    .module('ubuild')
    .controller('AccountActivityController', AccountActivityController);
     AccountActivityController.$inject = ['brudexservices', 'sessionService','$window'];
     function AccountActivityController(services, sessionService, $window) {
//        $('.date-picker').datetimepicker({
//            format: 'DD/MM/YYYY'
//        });
        var vm = this;
        vm.fromAcct = {};
        vm.toAcct = {};
        vm.toAcct.newAcct = {};
        vm.toAcct.beneficary = {};
        vm.toAcct.description = "";
        vm.toAcct.scheduleTransfer = false;
        vm.toAcct.schedule = {};
        vm.toAcct.schedule.startDate = new Date();
        vm.toAcct.schedule.endDate = new Date();
        vm.toAcct.schedule.repeat = "0";
        vm.toAcct.token = "";
        vm.toAcct.tokenMedium = "";
        vm.toAcct.isBenTransfer = false;
        vm.beneficiaryList = [];
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.myAccounts = [];
        vm.doAccountStatement = doTransfer;
        vm.sendToken = sendToken;
        vm.validateInterAccount = validateInterAccount;
        vm.confirmTransfer = confirmTransfer;
        vm.showConfirmButton = false;
        vm.toggleAcctTextBox = toggleAcctTextBox;
        vm.cancelTransfer = cancelTransfer;
        vm.resendToken = resendToken;
        var tokenMedium = "";

        function initializeAccounts() {
            var sessionData = sessionService.getSessionData();
            var myAccounts = [];
            if (sessionData != null) {
                myAccounts = sessionData.confirmData;
                if (myAccounts != null) {
                    myAccounts.forEach(function(item) {
                        var obj = {};
                        obj.applType = item.applType;
                        obj.acctType = item.acctType;
                        obj.acctNo = item.acctNo;
                        obj.isoCurr = item.isoCurr;
                        obj.display = item.acctType + " " + item.acctNo;
                        vm.myAccounts.push(obj);
                    });
                    vm.fromAcct = vm.myAccounts[0]; 
                }
               
            }
        }

        function confirmTransfer() {
            if (validateFields()) {
                vm.errorMsg = vm.successMsg = [];
                vm.showConfirmButton = true;
            }                     
        }

         function validateFields() {
             if (vm.tokenMedium === "") {
                 vm.errorMsg.push('Select Token Medium');
                 return false;
             }
             return true;
         }

        function loadBeneficiaries() {
            var payload = 'inter-account';
            services.getUserBeneficiaries(payload, function (response) {
                console.log(response);
                if (response.status === "00") {
                    var list = response.data;
                    vm.beneficiaryList = [];
                    for (var p = 0, len = list.length; p < len; p++) {
                        var obj = list[p];
                        obj.display = obj.accountName + '|' + obj.accountNumber;
                        vm.beneficiaryList.push(obj);
                    }

                } else {
                    vm.errorMsg.push(response.message);
                }
            });
        }


        function validateInterAccount() {
            if (vm.toAcct.beneficary == null) {
                vm.toAcct.beneficary = {};
            }
           if (Object.keys(vm.toAcct.beneficary).length === 0){
               console.log(vm.toAcct.newAcct.acctNumber);
               if (vm.toAcct.newAcct.acctNumber.length > 9) {
                   var payload = {};
                   payload.acctNumber = vm.toAcct.newAcct.acctNumber;
                   services.validateLocalAccount(payload, function (response) {
                       if (response.status === "00") {
                           vm.toAcct.newAcct.acctName = response.data.acctDesc;
                           vm.toAcct.newAcct.acctType = response.data.acctType;
                           vm.toAcct.newAcct.applType = response.data.applType;
                           vm.toAcct.newAcct.verifiedDisplay = response.data.acctType + ' ' + response.data.acctDesc + ' ' + vm.toAcct.newAcct.acctNumber;
                       } else {
                           toastr.warning('The account could not be verified. Account may be invalid');
                       }
                   });
               }
           }
       }

        function toggleAcctTextBox() {
            if (vm.toAcct.beneficary == null) {
                vm.toAcct.beneficary = {};
            }
            if (Object.keys(vm.toAcct.beneficary).length === 0) {
                vm.toAcct.isBenTransfer = false;
            } else {
                vm.toAcct.isBenTransfer = true;
            }
        }

       function doTransfer() {
           vm.successMsg = [];
           vm.errorMsg = [];
           var payload = {};
           payload.from = vm.fromAcct;
           payload.to = vm.toAcct;
           services.doAccountStatement(payload, function(response) {
               if (response.status === "00") {
                   vm.successMsg.push("Transfer Successful");
               } else {
                   vm.errorMsg.push(response.message);
               }
           });
       }

       function sendToken(medium) {
           vm.successMsg = [];
           vm.errorMsg = [];
           var payload = {};
           payload.medium = medium;
           tokenMedium = medium;
           services.sendTransferToken(payload, function(response) {
               if (response.status === "00") {
                   vm.successMsg.push("Confirmation token sent successfully");
               } else {
                   vm.errorMsg.push(response.message);
               }
           });
       }

     

       function cancelTransfer() {
           $window.location.reload();
       }

       
       function resendToken() {
           sendToken(tokenMedium);
       }

       initializeAccounts();
       loadBeneficiaries(); 
    }
})();
 
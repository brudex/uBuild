window.ibankIdle_2H17L3P2dT = false;
(function () {
    'use strict';
     angular
    .module('ubuild.app')
    .controller('AccountStatementController', AccountStatementController);
     AccountStatementController.$inject = ['brudexservices', 'sessionService','$window'];
     function AccountStatementController(services, sessionService, $window) {
         $('.date-picker').datepicker({
             format: 'yyyy/mm/dd'
         });
        var vm = this;
        vm.fromAcct = {};        
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.myAccounts = [];
        vm.statement = {};
        var fileDownloadtype = 'pdf';
        vm.doAccountStatement = doAcctStatement;
        vm.selectDownloadFile = selectDownloadFile;
        vm.downloadLink = '';
        vm.errors = {};

         function initializeAccounts() {
            var sessionData = sessionService.getSessionData();
            var myAccounts = [];
            if(sessionData != null) {
                myAccounts = sessionData.confirmData;
                if (myAccounts != null) {
                    vm.myAccounts = [];
                    myAccounts.forEach(function(item) {
                        var obj = {};
                        obj.applType = item.applType;
                        obj.acctType = item.acctType;
                        obj.acctNo = item.acctNo;
                        obj.acctName = item.acctName;
                        obj.isoCurr = item.isoCurr;
                        obj.display = item.acctName + " - " + item.acctType + " " + item.acctNo;
                        vm.myAccounts.push(obj);    
                    });
                    vm.fromAcct = []; 
                } 
            }
        }

         function validateFields() {
             console.log(vm.fromAcct);
            vm.errors = {};
            if (vm.fromAcct == null || vm.fromAcct.length == 0) {
                vm.errors['fromAcct'] = 'Please select the account number.';
            } 
            if (vm.statement.startDate == null) {
                vm.errors['startDate'] = 'Please select a valid start date.';
            }
            if (vm.statement.startDate == null) {
                vm.errors["endDate"] = 'Please select a valid end date.';
            }
            return (Object.keys(vm.errors).length < 1);
        }

        function selectDownloadFile(fileType) {
            console.log("the download file type is >>>", fileType);
            fileDownloadtype = fileType;
            doAcctStatement(true);
        } 
        function doAcctStatement(download) {
            if (!validateFields())
                return false;
           vm.successMsg = [];
           vm.errorMsg = [];
           var payload = {};
            if (!download) {
                if (vm.fromAcct.length > 1) {
                    toastr.info('Please select only one account when viewing!!');
                    return false;
                }
            }

           payload.accounts = [];
           vm.fromAcct.forEach(function (acct) {
               var item= {}
                item["AcctNo"] = acct.acctNo;
                item["AcctType"] = acct.acctType;
                item["ApplType"] = acct.applType;
                item["AcctName"] = acct.acctName;
                item["isoCurr"] = acct.isoCurr;
                payload.accounts.push(item);
           });
           payload["StartDate"] = vm.statement.startDate;
           payload["EndDate"] = vm.statement.endDate;
          
           if (download) {
               payload["fileType"] = fileDownloadtype;
               payload["download"] = download;
           } 
           $("#main-preloader").fadeTo("fast", 0.6);
           console.log("Account Statements payload is >>>", payload);
           $("#download-linker").hide();
            pauseIdleTime();
           services.getStatementByDate(payload, function (response) {             
               console.log("Account Statemnts >>>", response);
               if (response.status === "00") {
                   if (download) {
                       toastr.info('Downloading File Please wait....');
                       vm.downloadLink = response.file;
                       setTimeout(function() {
                           openFile(response.file,true);
                       },2000);
                   } else {
                       vm.statements = response.data;
                   }
                   $("#main-preloader").fadeOut();
                   resumeIdleTime();
               } else if (response.status === "03") {
                   toastr.info(response.message);
                   setTimeout(function () {
                       trackStatementJobStatus(response.requestId);
                   }, 5000);
               } else {
                   toastr.error(response.message);
                   $("#main-preloader").fadeOut();
                   resumeIdleTime();
                    
               }
           }); 
       }
        
        function trackStatementJobStatus(jobId) {
            var payload = {};
            payload.requestId = jobId;
             services.checkStatemJobStatus(payload, function (response) {
                 console.log("Account Statemnts >>>", response);
                 if (response.status === "00") {
                     toastr.info('Downloading File Please wait....');
                     vm.downloadLink = response.file;
                     setTimeout(function () {
                         openFile(response.file, true);
                     }, 2000);
                     $("#main-preloader").fadeOut();
                     resumeIdleTime();
                 } else if (response.status === "03") {
                     toastr.info(response.message);
                     setTimeout(function() {
                         trackStatementJobStatus(jobId);
                     }, 7000);
                 } else {
                     toastr.error(response.message);
                     $("#main-preloader").fadeOut();
                     resumeIdleTime();
                 }
             });
         }
         
       function openFile(href, newTab) {         
           var a = document.createElement('a');
           a.href = href;
           if (newTab) {
               a.setAttribute('target', '_blank');
           }
           a.click();
           $("#download-linker").slideDown();
       }

       function pauseIdleTime() {
           window.ibankIdle_2H17L3P2dT = true;
       }

       function resumeIdleTime() {
           window.ibankIdle_2H17L3P2dT = false;
       }

         pauseIdleTime();
       sessionService.subcribeOnData(initializeAccounts); 
    }
})();
 
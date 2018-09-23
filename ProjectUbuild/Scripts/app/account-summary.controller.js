(function () {
    'use strict'; 
     angular
    .module('ubuild')
    .controller('AccountSummary', AccountSummary);
    AccountSummary.$inject = ['brudexservices','sessionService', '$state'];
    function AccountSummary(services,sessionService, state) {
        var vm = this;
        vm.model = {};
        vm.accountSummary = [];
        vm.statements = [];
        vm.getMiniStatement = getMinistatement;
        vm.cardAccountsInfo = [];
        vm.firstName = '';
        function initializeAccountSummary() {
            $("#main-preloader").fadeTo("fast", 0.6);
            services.getAccountSummary({}, function (response) {
                $("#main-preloader").fadeOut();
                var accountInfo = response.data;
                if (accountInfo != null) {
                    vm.accountSummary = [];
                    for (var k = 0, len = accountInfo.length; k < len; k++){
                        if (!accountInfo[k].cardAcct) {
                            vm.accountSummary.push(accountInfo[k]);
                        }
                    }
                }
            });
        }

        function getMinistatement(accountInfo) {
           $("#main-preloader").fadeTo("fast", 0.6);
           vm.selectedAcct = accountInfo;
           vm.successMsg = [];
           vm.errorMsg = [];
           var payload = {};
           payload["AcctNo"] = accountInfo.acctNo;
           payload["AcctType"] = accountInfo.acctType;
           payload["ApplType"] = accountInfo.applType;
           console.log("Ministatement payload is >>>", payload);
           services.getMinistatement(payload, function (response) {
               $("#main-preloader").fadeOut();
               console.log("Ministatement response >>>",response);
               if (response.status === "00") {
                   vm.statements = [];            
                   response.data.forEach(function (item) {
                       if (item.transactionType === "DR") {
                           item.debit = item.amount;
                       } else {
                           item.credit = item.amount;
                       }
                       vm.statements.push(item);
                   });
               } else {
                   vm.errorMsg.push(response.message);
               }
           });
       }

       function getCardAccountsInfo() {
           var cardAccts = sessionService.getCardAcctNumbers();
           if (cardAccts.length > 0) {               
               services.getFimiAccountInfo({ accounts: cardAccts }, function (response) {
                   if (response.status === "00") {
                       var fimiAccounts = response.data;
                       fimiAccounts.forEach(function (acct) {                    
                           var obj = {};
                           obj.acctName = acct.acctInfo.personFIO;
                           obj.acctNo = acct.acctInfo.foundAccount;
                           obj.curBal = acct.acctInfo.avail;
                           obj.status = getAcctStatus(acct.acctInfo.status);
                           var cards = [];
                           if (acct.acctInfo.cards.row.constructor === Array) {
                               var rows = acct.acctInfo.cards.row;                              
                               for (var k = 0, len = rows.length; k < len; k++) {
                                   if (rows[k].type !== 2) {
                                       var crd = {};
                                       crd.pan = rows[k].pan;
                                       crd.status = getCardAcctStatus(rows[k].status);
                                       cards.push(crd);
                                   }                                  
                               }                              
                           } else {
                               var crd = {};
                               crd.pan = acct.acctInfo.cards.row.pan;
                               crd.status = getCardAcctStatus(acct.acctInfo.cards.row.status);
                               cards.push(crd);
                           }
                           obj.cards = cards;
                           vm.cardAccountsInfo.push(obj);
                        });
                   }
               });          
           } 
       }



       function getCardAcctStatus(code) {
           var statusMessage = {
               "0": "Not Active",
               "1": "Open",
               "2": "Lost",
               "3": "Stolen",
               "4": "Restricted",
               "5": "VIP",
               "6": "Open Domestic",
               "8": "Compromised",
               "9": "Closed",
               "10": "Referral",
               "12": "Declared",
               "15": "Expired"
           }
           var text = statusMessage["" + code];
            if (text == null) {
                text = code + "-Unknown";
            }
           return text;
       }
      

        function getAcctStatus(code) {
           var statusMessage = {
               "1": "Open",
               "3": "Primary open",
               "9": "Closed" 
           }
           var text = statusMessage["" + code];
            if (text == null) {
                text = code + "-Unknown";
            }
           return text;
       }
    
       vm.transferMoney = function() {
           state.go('intra-transfer');
       }


        vm.goBack = function() {
            vm.statements = [];
            vm.selectedAcct = null;
        }
        initializeAccountSummary();
        setTimeout(function() {
            sessionService.subcribeOnData(getCardAccountsInfo);
        }, 1000);

        sessionService.subcribeOnData(function() {
            vm.firstName = sessionService.getFirstName();
        });

//        $('#rescheduleMessageModal').modal({
//            show: 'true'
//        });
    }

})();
 

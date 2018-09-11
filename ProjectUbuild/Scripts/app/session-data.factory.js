(function($) {
    angular
    .module('ubuild.app')
    .factory('sessionService', SessionService);
    SessionService.$inject = ['$http', '$location'];
    function SessionService($http, $location) {
        toastr.options = {
            "positionClass": "toast-bottom-right"
        };
        var dataStore = {};
        var sessionData = {accessToken:''};
        var subscriptions = [];
        function initializeSessionData(services) {
            var getUserSessionCallback = function(response) {      
                if (response.status === "00") {
                    sessionData = response.data;
                    console.log('The session data is >>>', sessionData);
                    sessionData.userInfo = {};
                    if(sessionData.loginData.roles){
                        sessionData.loginData.roles.forEach(function(item) {
                            sessionData.userInfo[item.claim] = item.value;
                        });
                    }
                    if (sessionData.userInfo.token_login === true || sessionData.userInfo.token_login === 'True') {
                        sessionData.userInfo.token_login = true;
                    } else {
                        sessionData.userInfo.token_login = false;
                    }
                    console.log('The login type is token login right? >>>', sessionData.userInfo.token_login);
                    subscriptions.forEach(function (func) {
                        func(sessionData);
                    });                   
                   
                } 
            }
            services.getUserSession({}, getUserSessionCallback);
        }

        

        function getSessionData() {
            return sessionData;
        }
         
        function getTransferFromAccounts(interIntra) {
            var filters = ['transferFrom'];
            filters.push('globalTransferFrom');
            if (interIntra === 'intra') {
                filters.push('globalIntra');
            }else if (interIntra === 'inter') {
                filters.push('globalInter');
            } else if (interIntra === 'inter-bank') {
                filters.push('globalInter');
//                filters.push('interBankTransfer');
//                filters.push('globalAch');
//                filters.push('globalGip');
            }
            return filterFieldsTrue(filters); 
        }

       function getTransferToAccounts(interIntra) {
           var filters = ['transferTo'];
           filters.push('globalTransferTo');
            if (interIntra === 'intra') {
                filters.push('globalIntra');
            }else if (interIntra === 'inter') {
                filters.push('globalInter');
            }else if (interIntra === 'inter-bank') {
                filters.push('interBankTransfer');
            }
           console.log('The fileters are >>>', filters);
            return filterFieldsTrue(filters); 
        }

        function filterFieldsTrue(filters) {
            var accts = [];
            sessionData.confirmData.forEach(function (item) {
                var add = false;
                for (var k = 0, len = filters.length; k < len; k++) {
                    var field = filters[k];
                    if (item[field] === false) {
                        add = false;
                        break;
                    } else {
                        add = true;
                    }
                }
                if (add) {
                    accts.push(item);
                }
            });
            return accts;
        }
        return {
            getSessionData: getSessionData,
            saveDataInSession: saveDataInSession,
            popDataInSession: popDataInSession,
            locationService: $location,
            initializeSessionData: initializeSessionData,
            subcribeOnData: subcribeOnData,
            getTransferToAccounts: getTransferToAccounts,
            getTransferFromAccounts: getTransferFromAccounts,
            getVisaCardAccts: getVisaCardAccts,
            getInvestmentAccounts: getInvestmentAccts,
            getFirstName: getFirstName,
            getCardAcctNumbers: getCardAcctNumbers
       };

        function saveDataInSession(key, data) {
            dataStore[key] = data;
            console.log('Current data store is >>>> ');
            console.log(dataStore);
        }

        function getFirstName() {
            var fname = 'Customer';
            if (sessionData.userInfo.given_name) {
                return sessionData.userInfo.given_name;
            }
            sessionData.roles.forEach(function (item) {
                if (item.claim==="given_name") {
                    fname = item.value;
                }
            });
            return fname;
        }

        function getCardAcctNumbers(){
            var accts = [];
            console.log('Getting visa card accounts >>>', accts);
            sessionData.confirmData.forEach(function (item) {
                if (item.cardAcct) {
                    accts.push(item.acctNo);
                }
            });
            console.log('The visa card accounts are >>>', accts);
            return accts;
        }

        function getVisaCardAccts() {
            var accts = [];
            console.log('Getting visa card accounts >>>', accts);
            sessionData.confirmData.forEach(function (item) {
                if (item.cardAcct) {
                    accts.push(item);
                }
            });
            console.log('The visa card accounts are >>>', accts);
            return accts;
        }

        function getInvestmentAccts() {
            var classCodes = [335, 334, 337, 336];
            var accts = [];
            sessionData.confirmData.forEach(function (item) {              
                if (classCodes.indexOf(item.classCode) > -1) {
                    accts.push(item);
                }               
            });
            return accts;           
        }

        function popDataInSession(key) {
            var temp = dataStore[key];
            delete dataStore[key];
            return temp;
        }

        function subcribeOnData(func) {
            if(typeof func === 'function') {
                if (sessionData.accessToken === '') {
                    subscriptions.push(func);
                } else {
                    func();
                }              
            }
        }
    } 

//    $(document).idle({
//        onIdle: function () {         
//            if (window.ibankIdle_2H17L3P2dT) {
//                return;
//            }
//            toastr.info('Session has been idle over its time limit. You will be logged out now...');
//            setTimeout(function() {
//                window.location = "/Account/Logout";
//            }, 3000); 
//        },        
//        idle: 120000   
//    });
})(jQuery);
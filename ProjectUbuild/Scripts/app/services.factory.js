(function () {
    angular
        .module('ubuild.app')
        .factory('brudexservices', DataService);
    DataService.$inject = ['$http', '$location', 'sessionService', '$window'];
    function DataService($http, $location, sessionService,$window) {
        var adminActionUrl = "/api/Action/";
        sessionService.initializeSessionData({ getUserSession: getUserSession, getAvailableTokenGateways: getAvailableTokenGateways });
        
        return {
            getUserSession: getUserSession,
            changePassword: changePassword,
            doIntraTransfer: doIntraTransfer,
            doInterTransfer: doInterTransfer,
            doAirtimeTopup: doAirtimeTopup,
            generateZVoucherToken: generateZVoucherToken,
            doInterBankTransfer: doInterBankTransfer,
            getUserBeneficiaries: getUserBeneficiaries,
            getMinistatement: getMinistatement,
            getStatementByDate: getStatementByDate,
            checkStatemJobStatus: checkStatemJobStatus,
            sendTransferToken: sendTransferToken,
            getAvailableTokenGateways: getAvailableTokenGateways,
            validateLocalAccount: validateLocalAccount,
            getBankList: getBankList,
            getTelcoList: getTelcoList,
            getBankBranches: getBankBranches,
            saveBeneficiary: saveBeneficiary,
            getMyBeneficiaries: getMyBeneficiaries,
            deleteBeneficiary: deleteBeneficiary,
            addBillAccount: addBillAccount,
            getBillProducts: getBillProducts,
            getBillAccounts: getBillAccounts,
            doBillPayment: doBillPayment,
            deleteBillAccount: deleteBillAccount,
            getTransferProductFee: getTransferProductFee,
            getScheduledTransfers: getScheduledTransfers,
            getTransferHistory: getTransferHistory,
            getTransferHistoryByDate: getTransferHistoryByDate,
            cancelSchedule: cancelSchedule,
            getAccountSummary: getAccountSummary,
            verifyAcctViaGip: verifyAcctViaGip,
            verifyBillAccount: verifyBillAccount,
            getFimiAccountInfo: getFimiAccountInfo,
            changePin: changePin,
            doCancelToken: doCancelToken,
            doGetActiveTokens: GetActiveTokens,
            ResendZVoucherSMS: ResendZVoucherSMS,
            GetEbillers: GetEbillers,
            GetAmountPayable: GetAmountPayable,
            getDestinationBranches: doAction('destinaion-branches'),
            doChequeBookRequest: doAction('cheque-book-request'),
            doSelfServiceRequest: doAction('self-service-request'),
            getRequests: doAction('get-request-list'),
            getCustomerEmail: doAction('customer-email'),
            updateRequestStatus: doAction('update-request-status')
        };
       

        function doAction(actionName) {
            return function (data, callback) {
                if (!callback) {
                    callback = data;
                    data = {};
                }
                var payload = {};
                payload.action = actionName;
                payload.data = data;
                doPost(payload, function (err, response) {
                   if (err) {
                        toastr.error(err);
                        return;
                    }
                    callback(response.data);
                });
            }
        }
        function ResendZVoucherSMS(data, callback) {
            var payload = {};
            payload.action = "resend-zvoucher-token";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function GetEbillers(data, callback) {
            var payload = {};
            payload.action = "get-billers";
           
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function GetAmountPayable(data, callback) {
            var payload = {};
            payload.action = "get-bill-amountPayable";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function GetActiveTokens(data, callback) {
            var payload = {};
            payload.action = "myactive-zvouchers";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function generateZVoucherToken(data, callback) {
            var payload = {};
            payload.action = "generate-zvoucher";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function doCancelToken(data, callback) {
            var payload = {};
            payload.action = "cancel-zvoucher";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }


       
        function doAirtimeTopup(data, callback) {
            var payload = {};
            payload.action = "airtime-topup";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getFimiAccountInfo(data, callback) {
            var payload = {};
            payload.action = "fimi-acoount-info";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function verifyAcctViaGip(data, callback) {
            var payload = {};
            payload.action = "verify-gip-acct";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function verifyBillAccount(data, callback) {
            var payload = {};
            payload.action = "verify-bill-acct";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getAccountSummary(data, callback) {
            var payload = {};
            payload.action = "account-summary";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function changePin(data, callback) {
            var payload = {};
            payload.action = "change-pin";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function cancelSchedule(data, callback) {
            var payload = {};
            payload.action = "cancel-trans-schedule";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }
        function getScheduledTransfers(data, callback) {
            var payload = {};
            payload.action = "transfer-schedules";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }
        function getTransferHistory(data, callback) {
            var payload = {};
            payload.action = "transfer-history-by-id";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getTransferHistoryByDate(data, callback) {
            var payload = {};
            payload.action = "transfer-history-by-date";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getStatementByDate(data, callback) {
            var payload = {};
            payload.action = "dated-statement";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }
        function checkStatemJobStatus(data, callback) {
            var payload = {};
            payload.action = "statementjob-status";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getMinistatement(data, callback) {
            var payload = {};
            payload.action = "mini-statement";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function doBillPayment(data, callback) {
            var payload = {};
            payload.action = "bill-payment";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function deleteBillAccount(data, callback) {
            var payload = {};
            payload.action = "del-bill-account";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getBillAccounts(data, callback) {
            var payload = {};
            payload.action = "bill-accounts";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }


        function getBillProducts(data, callback) {
            var payload = {};
            payload.action = "bill-products";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }


        function addBillAccount(data, callback) {
            var payload = {};
            payload.action = "add-billact";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }


        function deleteBeneficiary(data, callback) {
            var payload = {};
            payload.action = "delete-benef";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getMyBeneficiaries(data, callback) {
            var payload = {};
            payload.action = "my-beneficiaries";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function saveBeneficiary(data, callback) {
            var payload = {};
            payload.action = "add-benef";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getBankList(data, callback) {
            var payload = {};
            payload.action = "bank-list";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getTelcoList(data, callback) {
            var payload = {};
            payload.action = "telco-list";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getBankBranches(data, callback) {
            var payload = {};
            payload.action = "bank-branches";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }
        function validateLocalAccount(data, callback) {
            var payload = {};
            payload.action = "validate-interaccount";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function sendTransferToken(data, callback) {
            var payload = {};
            payload.action = "transfer-token";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getAvailableTokenGateways(data, callback) {
            var payload = {};
            payload.action = "token-gateway";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getUserBeneficiaries(data, callback) {
            var payload = {};
            payload.action = "my-beneficiaries";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function getTransferProductFee(data, callback) {
            var payload = {};
            payload.action = "trans-product-fee";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function changePassword(data, callback) {
            var payload = {};
            payload.action = "change-pass";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function doIntraTransfer(data, callback) {
            var payload = {};
            payload.action = "transfer-intra";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

        function doInterBankTransfer(data, callback) {
            var payload = {};
            payload.action = "transfer-interbank";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }

         

        function doInterTransfer(data, callback) {
            var payload = {};
            payload.action = "transfer-inter";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }


        function getUserSession(data, callback) {
            var payload = {};
            payload.action = "session-data";
            payload.data = data;
            doPost(payload, function (err, response) {
                if (err) {
                    toastr.error(err);
                    return;
                }
                callback(response.data);
            });
        }



        function doPost(data, callback) {         
             return $http.post(adminActionUrl, data)
                .then(function (response) {
                    if (response == null) {
                       return callback(null, {status:"07",message :"Error in response"});
                    }
                    if (response && response.status == "3399") {
                        toastr.error(response.message);
                        setTimeout(function () {
                            $window.location = "/Account/Logout";
                        }, 3000);
                        return callback(null,response);
                    }                   
                    callback(null, response);
                })
                .catch(function (error) {
                    console.log(error);
                    callback(error);
                }); 
        }


    }
})();
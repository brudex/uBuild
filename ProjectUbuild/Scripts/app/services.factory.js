(function () {
    angular
        .module('ubuild')
        .factory('brudexservices', DataService);
    DataService.$inject = ['$http', '$location', '$window'];
    function DataService($http, $location,$window) {
        var baseUrl = "";      
        return {          
            getFixturesFittings: getData('/api/LoanApi/GetFittingsFixtures'),
            getInterestRates: getData('/api/LoanApi/GetLoanInterestRates'),
            submitProfile: postData('/api/AccountApi/SaveProfile'),
            checkLoanEligibility: postData('/api/LoanApi/CheckLoanEligibility'),
            getAccountProfile: postData('/api/AccountApi/AccountProfile'),
            getUncompletedProfile: getData('/api/AccountApi/GetUncompletedProfile'),
            applyForLoan: postData('/api/LoanApi/ApplyForLoan'),
            getHouseDesigns: getData('/api/LoanApi/GetHouseDesigns'),
            getHouseCustomizables: getData('/api/LoanApi/GetHouseDesignCustomizibles'),
            getCustomizableFnFs: getData('/api/LoanApi/GetCustomizableFnFs'),
            getRepaymentMethods: getData('/api/LoanApi/GetRepaymentMethods'),
            getCurrencies: getData('/api/LoanApi/GetCurrencies'),
            getLoanApplTypes: getData('/api/LoanApi/GetLoanApplTypes'), 
            getBuildingPhases: getData('/api/LoanApi/GetBuildingPhases'), 
            sendTokenByAcctNo: postData('/api/AccountApi/SendOtpByAcctNo'),
            validateTokenByAcctNo: postData('/api/AccountApi/ValidateOtpByAcctNo'),
            getLoanAmountLimits: getData('/api/LoanApi/GetLoanAmountCurrencyLimits'),
            getPhaseLoanTenorLimits: getData('/api/LoanApi/GetPhaseLoanTenorLimits'),
            acceptRejectLoanTerms: postData('/api/LoanApi/AcceptRejectLoanTerms')
        }; 
         


        function postData(endpoint) {
            return function (data, callback) {
                if (!callback) {
                    callback = data;
                    data = {};
                }
                var url = baseUrl + endpoint;
                 doPost(url,data, function (err, response) {
                   if (err) {
                        console.error(err);
                        return;
                    }
                    callback(response.data);
                });
            }
        }

        function getData(url) {
            return function (callback) {
                if (arguments.length > 1) {
                    url = url + "/" + arguments[0];
                    callback = arguments[1]; 
                }
                 doGet(url, function (err, response) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    callback(response.data);
                });
            }
        }
        
        function doPost(url,data, callback) {
             return $http.post(url, data)
                .then(function (response) {
                    if (response === null) {
                       return callback(null, {status:"07",message :"Error in response"});
                    }
                    return callback(null, response);
                })
                .catch(function (error) {
                    console.log(error);
                    callback(error);
                }); 
        }

        function doGet(endpoint, callback) {
            var url = baseUrl + endpoint;
            return $http.get(url)
               .then(function (response) {
                   if (response === null) {
                       return callback(null, { status: "07", message: "Error in response" });
                   }
                  return callback(null, response);
               })
               .catch(function (error) {
                   console.log(error);
                   return callback(error);
               });
        }


    }
})();
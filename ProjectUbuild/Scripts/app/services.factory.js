(function () {
    angular
        .module('ubuild.app')
        .factory('brudexservices', DataService);
    DataService.$inject = ['$http', '$location', 'sessionService', '$window'];
    function DataService($http, $location, sessionService,$window) {
        var adminActionUrl = "";
        sessionService.initializeSessionData({ getUserSession: getUserSession, getAvailableTokenGateways: getAvailableTokenGateways });
        
        return {
            
            gitFixturesFittings: getData('/api/LoanApi/GetFittingsFixtures'),
            getHouseImages: getData('/api/LoanApi/GetHouseImages'),
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

        function getData(url) {
            return function (callback) {
                 doGet(url, function (err, response) {
                    if (err) {
                        toastr.error(err);
                        return;
                    }
                    callback(response.data);
                });
            }
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

        function doGet(endpoint, callback) {
            var url = adminActionUrl + endpoint;
            return $http.get(url)
               .then(function (response) {
                   if (response == null) {
                       return callback(null, { status: "07", message: "Error in response" });
                   }
                   if (response && response.status == "3399") {
                       toastr.error(response.message);
                       setTimeout(function () {
                           $window.location = "/Account/Logout";
                       }, 3000);
                       return callback(null, response);
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
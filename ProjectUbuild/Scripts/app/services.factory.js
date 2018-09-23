﻿(function () {
    angular
        .module('ubuild')
        .factory('brudexservices', DataService);
    DataService.$inject = ['$http', '$location', '$window'];
    function DataService($http, $location,$window) {
        var baseUrl = "";      
        return {          
            gitFixturesFittings: getData('/api/LoanApi/GetFittingsFixtures'),
            getHouseImages: getData('/api/LoanApi/GetHouseImages'),
            submitProfile: postData('/api/AccountApi/SaveProfile'),
             
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
                    if (response == null) {
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
                   if (response == null) {
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
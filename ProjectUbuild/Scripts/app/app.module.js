(function () {
    angular
        .module('ubuild', ['ngMessages']);


})();


var ubuild = angular.module('ubuild', ['ngMessages'])
    .service('fileUpload', ['$http', function ($https) {

        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);

            $https.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function (response) {

                    if (response.Status == "00") {
                        alert(response.Message);
                        window.location.reload();
                    } else
                        alert(response.Message);
                })
                .error(function (error) {

                    alert("An error occured, Please try again");
                });
        }
    }]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])




ubuild.controller("AppCtrl", AppCtrl);
AppCtrl.$inject = ["$scope", "$http", "$timeout", "$rootScope", 'brudexservices', 'brudexutils', '$window', 'fileUpload'];

function AppCtrl($scope, $http, $timeout, $rootScope, services, utils, $window, fileUpload) {

    var vm = this;
    vm.loadingFile = false;

    getMessageCount();

    function getMessageCount() {
        services.getUnreadMessagesCount(function (response) {
            if (response.Status == "00") {
                $rootScope.messagesCount = response.data;
            }
        });
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    vm.uploadFile = function () {
        vm.loadingFile = true;
        var ulain = getParameterByName("clientUlain");
        var uploadUrl = "/api/LoanApi/UploadDocument?clientUlain=" + ulain;

        var fd = new FormData();
        fd.append('file', vm.uploadDoc.myFile);
        fd.append("DocType",vm.uploadDoc.DocType);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .success(function (response) {
                vm.loadingFile = false;
                if (response.Status == "00") {
                    alert(response.Message);
                    window.location.reload();
                } else
                    alert(response.Message);
            })
            .error(function (error) {
                vm.loadingFile = false;
                alert("An error occured, Please try again");
            });
    };


}







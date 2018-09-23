/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables. 
 * ============================================================ */

angular.module("app")
    .controller("AppCtrl", [
        "$scope", "$rootScope",
        function ($scope, $rootScope) {
            
            // Broadcasts a message to pgSearch directive to toggle search overlay
            $scope.showSearchOverlay = function() {
                $scope.$broadcast("toggleSearchOverlay", {
                    show: true
                });
            };
        }
    ]);

angular.module("app")
    /*
        Use this directive together with ng-include to include a 
        template file by replacing the placeholder element
    */
    .directive("includeReplace", function() {
        return {
            require: "ngInclude",
            restrict: "A",
            link: function(scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });
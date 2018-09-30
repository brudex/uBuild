(function () {
    'use strict';

    angular.module('ubuild')
        .controller('HouseDesignController', HouseDesignController);
    HouseDesignController.$inject = ['brudexservices', '$location', '$scope'];

    function HouseDesignController(services, location, $scope) {
        var vm = this;
        vm.init = function () {

        };
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.requests = [];
        vm.houseImages = [];
        vm.fixtureFittings = [];
        vm.customizables = [];
        var fullHouseId = 1;
        vm.model = {};
        vm.model.calcuation = {};
        vm.model.selectedFixtures = {};
        vm.model.houseCost = 0;

        $scope.$watch("vm.model.itemSelected",
            function (newValue) {
                console.log("vm.model.itemSelected", vm.itemSelected);
            });

        function loadCustomizables() {
            services.getHouseCustomizables(fullHouseId, function (response) {
                console.log(response);
                vm.customizables = response;
            });
        }

        function loadFittingsFixtures() {
            services.getFixturesFittings(fullHouseId, function (response) {
                console.log(response);
                vm.fixtureFittings = response;
            });
        }

        function updateTotalCost() {
            for (var item in vm.model.selectedFixtures) {
                if (vm.model.selectedFixtures.hasOwnProperty(item)) {
                    console.log("Item in update cost is >>", item);
                    vm.model.houseCost += Number(vm.model.selectedFixtures[item].UnitCost);
                }
            }
        }

        vm.fixtureSelected = function (fixture) {
            vm.model.selectedFixtures["record" + vm.model.selectedCustomizable.RecordId] = fixture;
            updateTotalCost();
        }

        vm.deleteFixture = function (id) {
            delete vm.model.selectedFixture["record" + id];
            updateTotalCost();
        }

        vm.checkEligibility = function () {
            var payload = { income: vm.model.income, amount: vm.model.houseCost, currency: "USD" };
            console.log('the payload is >>>', payload);
            services.checkLoanEligibility(payload, function (response) {
                console.log("the response for eligibility >>", response);
                if (response.Status === "00") {
                    swal({
                        title: "Congratulations",
                        text: "You are eligible for this loan",
                        buttons: {
                            cancel: "OK",
                            catch: {
                                text: "Apply Now",
                                value: "applyButton"
                            }
                        }
                    }).then((value) => {
                        switch (value) {
                            case "applyButton":
                                var newUrl = window.location.host + "/loan/apply";
                                console.log("newUrl", newUrl);
                                window.location.href = window.location.host + "/loan/apply";
                                break;
                        }
                    });
                } else if (response.Status === "01") {
                    utils.alertError("Sorry", response.Message);
                }
            });
        }

        loadCustomizables();
        loadFittingsFixtures();
    }


})();

(function ($) {
    'use strict';

    angular.module('ubuild')
        .controller('HouseDesignController', HouseDesignController);
    HouseDesignController.$inject = ['brudexservices', '$location', '$scope'];

    function HouseDesignController(services, location, $scope) {
        var vm = this;
         
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.requests = [];
        vm.houseImages = [];
        vm.fixtureFittings = [];
        vm.customizables = [];
        vm.loanLimits = [];
        vm.maxLoanTenure = 15;
        vm.minLoanTenure = 1;
        var currencyId = 1;
        var fullHouseId = document.getElementById("__selected_house_id").value;
        console.log('The __selected_house_id is ', fullHouseId);
         
        vm.model = {};
        vm.model.calcuation = {};
        vm.model.selectedFixtures = {};
        vm.model.houseCost = document.getElementById("__selected_house_cost").value;
        vm.model.houseCostCurrency = document.getElementById("__selected_house_currency").value;
        console.log('The __selected_house_cost is ', vm.model.houseCost);

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
        function loadLoanAmountLimits() {
            services.getLoanAmountLimits(function (response) {
                console.log("Loan amount limits >>>");
                console.log(response);
                vm.loanLimits = response;
                var selected = response.filter(function(item) {
                    return Number(item.RecordId) === currencyId;
                });
                if (selected.length) {
                    vm.maxLoanTenure = Number(selected[0].MaxTenorMonths)/12;
                    vm.minLoanTenure = Number(selected[0].MinLoanAmount)/12;
                }
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

        vm.getTenureRange = function () {
            var ranges = [];
            for (var k = 1; k <= vm.maxLoanTenure; k++) {
                ranges.push(k);
            }
            return ranges;
        }

        loadCustomizables();
        loadFittingsFixtures();
        loadLoanAmountLimits(); 
    }


})(jQuery);

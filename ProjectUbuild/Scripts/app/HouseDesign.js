(function ($) {
    'use strict';

    angular.module('ubuild')
        .controller('HouseDesignController', HouseDesignController);
    HouseDesignController.$inject = ['brudexservices', '$location', '$scope', '$window'];

    function HouseDesignController(services, location, $scope, $window) {
        var vm = this;
         
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.requests = [];
        vm.houseImages = [];
        vm.fixtureFittings = [];
        vm.customizableFixtureFittings = [];
        vm.customizables = [];
        vm.loanLimits = [];
        vm.maxLoanTenure = 15;
        vm.minLoanTenure = 1;
        var currencyId = 1;
        var fullHouseId = document.getElementById("__selected_house_id").value;
          
        vm.model = {};
        vm.model.calcuation = {};
        vm.model.selectedFixtures = {};
        vm.model.houseCost = document.getElementById("__selected_house_cost").value;
        vm.model.houseCostCurrency = document.getElementById("__selected_house_currency").value;
 
        $scope.$watch("vm.model.selectedFixture",
            function (newValue) {
                console.log("vm.model.selectedFixture", newValue);
                if (newValue != null) {
                     vm.fixtureSelected(newValue);
                }
            });

        function loadCustomizables() {
            services.getHouseCustomizables(fullHouseId, function (response) {
                console.log("the loaded customizables >>");
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
                    console.log("Item in update is >>", item);
                    console.log("Item in update is >>", vm.model.selectedFixtures[item]);
                    vm.model.houseCost = Number(vm.model.houseCost) + (Number(vm.model.selectedFixtures[item].ItemCount) * Number(vm.model.selectedFixtures[item].UnitCost));
                }
            }
        }

        vm.fixtureSelected = function (fixtureId) {
            console.log('The selected fixture >>', fixtureId);
           var fixtures = vm.customizableFixtureFittings.filter(function(item) {
                return Number(item.RecordId) === Number(fixtureId);
           });
            if (fixtures.length) {
                vm.model.selectedFixtures["record" + vm.model.selectedCustomizable.RecordId] = fixtures[0];
                vm.model.selectedFixtures["record" + vm.model.selectedCustomizable.RecordId].ItemCount = vm.model.selectedCustomizable.ItemCount;
                console.log("vm.model.selectedFixtures", vm.model.selectedFixtures);
                updateTotalCost();
            } 
        }

        vm.deleteFixture = function (id) {
            console.log('Deleting fixture >>>', id);
            delete vm.model.selectedFixtures["record" + id];
            updateTotalCost();
        }

        vm.checkEligibility = function () {
            var payload = {loanType :"Fullhouse", monthlyIncome: vm.model.income, loanAmount: vm.model.houseCost, currency: vm.model.houseCostCurrency, loanTenure: vm.model.tenure };
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
                                $window.location.href = "/loan/apply";
                                break;
                        }
                    });
                } else if (response.Status === "01") {
                    utils.alertError("Sorry", response.Message);
                }
            });
        }

        vm.getFixturesForCustomizable = function (customizable) {
            console.log('Selected costomizable >>', customizable);
            vm.customizableFixtureFittings = vm.fixtureFittings.filter(function (item) {
                return Number(item.RecordId) === Number(customizable.FixturesAndFittingsId);
            });
            console.log('The customizable fixture fittings >>', vm.customizableFixtureFittings);
            setTimeout(function() {
                $(".image-picker").imagepicker();
            }, 1000);
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

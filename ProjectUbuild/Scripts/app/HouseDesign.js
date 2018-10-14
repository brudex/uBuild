(function ($) {
    'use strict';

    angular.module('ubuild')
        .controller('HouseDesignController', HouseDesignController);
    HouseDesignController.$inject = ['brudexservices', '$location', '$scope', '$window', 'brudexutils'];

    function HouseDesignController(services, location, $scope, $window,utils) {
        var vm = this;
        vm.ajax = false;
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
        vm.model.totalLoanAmt = document.getElementById("__selected_house_cost").value;
        $scope.$watch("vm.model.selectedFixture",
            function (newValue) {
                console.log("vm.model.selectedFixture", newValue);
                if (newValue != null) {
                     vm.fixtureSelected(newValue);
                }
            });

        function loadCustomizables() {
            vm.ajax = true;
            services.getHouseCustomizables(fullHouseId, function (response) {
                vm.ajax = false;
                console.log("the loaded customizables >>");
                console.log(response);
                vm.customizables = response;
            });
        }

        function loadFittingsFixtures() {
            vm.ajax = true;
            services.getFixturesFittings(fullHouseId, function (response) {
                vm.ajax = false;
                console.log(response);
                vm.fixtureFittings = response;
            });
        }

        function loadLoanAmountLimits() {
            vm.ajax = true;
            services.getLoanAmountLimits(function (response) {
                vm.ajax = false;
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
            vm.ajax = true;
            vm.model.totalLoanAmt = vm.model.houseCost;
            for (var item in vm.model.selectedFixtures) {
                if (vm.model.selectedFixtures.hasOwnProperty(item)) {
                    console.log("Item in update is >>", item);
                    console.log("Item in update is >>", vm.model.selectedFixtures[item]);
                    vm.model.totalLoanAmt = Number(vm.model.houseCost) + (Number(vm.model.selectedFixtures[item].ItemCount) * Number(vm.model.selectedFixtures[item].UnitCost));
                }
            }
            vm.ajax = false;
        }

        vm.fixtureSelected = function (fixtureId) {
            console.log('The selected fixture >>', fixtureId);
           var fixtures = vm.customizableFixtureFittings.filter(function(item) {
                return Number(item.RecordId) === Number(fixtureId);
           });
           if (fixtures.length) {
               console.log("The fixtured selected added >>", "record" + vm.model.selectedCustomizable.RecordId);
                vm.model.selectedFixtures["record" + vm.model.selectedCustomizable.RecordId] = fixtures[0];
                vm.model.selectedFixtures["record" + vm.model.selectedCustomizable.RecordId].ItemCount = vm.model.selectedCustomizable.ItemCount;
                console.log("vm.model.selectedFixtures", vm.model.selectedFixtures);
                updateTotalCost();
            } 
        }

        vm.deleteFixture = function (id) {
            console.log('Deleting fixture whold>>>', id);
            console.log("The whole fixture  >>>", vm.model.selectedFixtures);
            delete vm.model.selectedFixtures[id];
            updateTotalCost();
        }

         

        vm.checkEligibility = function () {
            vm.ajax = true;
            var payload = {loanType :"Fullhouse", monthlyIncome: vm.model.income, loanAmount: vm.model.houseCost, currency: vm.model.houseCostCurrency, loanTenure: vm.model.tenure };
            console.log('the payload is >>>', payload);
            services.checkLoanEligibility(payload, function (response) {
                vm.ajax = false;
                console.log("the response for eligibility >>", response);
                if (response.Status === "00") {
                    swal({
                        title: "Congratulations",
                        text: response.Message,
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
                                {
                                    var qstring = $.param(payload);
                                    console.log("Questring >>>", qstring);
                                    $window.location.href = "/loan/apply?" + qstring;
                                } 
                            break;
                        }
                    });
                } else {
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

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
                if (newValue !== null) {
                    console.log("callig fixtureSelected >>>", newValue);
                     vm.fixtureSelected(newValue);
                }
            });

        function loadCustomizables() {
            vm.ajax = true;
            services.getCustomizableFnFs(function (response) {
                vm.ajax = false;
                console.log("the loaded customizables >>");
                console.log(response);
                vm.customizables = response;
            });
        }
		 

        function loadFittingsFixtures() {
            vm.ajax = true;
            services.getHouseCustomizables(fullHouseId, function (response) {
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
                    vm.minLoanTenure = 1; // Number(selected[0].MinLoanAmount)/12;
                }
            });
        }

        function updateTotalCost() {
            vm.model.totalLoanAmt = vm.model.houseCost;
            for (var item in vm.model.selectedFixtures) {
                console.log('the item is <<<', item);
                if (vm.model.selectedFixtures.hasOwnProperty(item)) {
                    console.log('The vm.model.selectedFixtures[item].ItemCount >>', vm.model.selectedFixtures[item]);
                    vm.model.totalLoanAmt = Number(vm.model.totalLoanAmt) + (Number(vm.model.selectedFixtures[item].ItemCount) * Number(vm.model.selectedFixtures[item].UnitCost));
                }
            }
            console.log('the house cost is >>>', vm.model.houseCost);
        }

        function updateInitialTotalCost() {
            vm.ajax = true;
           var initialHouseCost = vm.model.houseCost;
            for (var item in vm.model.selectedFixtures) {
                if (vm.model.selectedFixtures.hasOwnProperty(item)) {
                    initialHouseCost = Number(initialHouseCost) - (Number(vm.model.selectedFixtures[item].ItemCount) * Number(vm.model.selectedFixtures[item].UnitCost));
                }
            }
            vm.ajax = false;
            vm.model.houseCost = initialHouseCost;
        }

        vm.fixtureSelected = function (fixtureId) {
            console.log('The selected fixture >>', fixtureId);
            console.log('vm.customizableFixtureFittings length >>', vm.customizableFixtureFittings.length);
           var fixtures = vm.customizableFixtureFittings.filter(function(item) {
                return Number(item.RecordId) === Number(fixtureId);
           });
           if(fixtures.length){
               console.log("The fixtured selected added >>", "record" + vm.model.selectedCustomizable.RecordId);
                vm.model.selectedFixtures["record" + vm.model.selectedCustomizable.RecordId] = fixtures[0];
                 console.log("vm.model.selectedFixtures", vm.model.selectedFixtures);
                updateTotalCost();
            } 
        }

        vm.deleteFixture = function (id) {
            console.log('Deleting fixture whold>>>', id);
            console.log("The whole fixture  >>>", vm.model.selectedFixtures);
            delete vm.model.selectedFixtures[id];
            updateTotalCost();
            vm.model.selectedFixture = null;
            vm.getFixturesForCustomizable(vm.model.selectedCustomizable); 
        }

        vm.saveCustomization = function () {
            var payload = vm.model;
            payload.houseId = fullHouseId;
            services.saveCustomization(payload, function(response) {
                if (response.status === "00") {
                    utils.alertSuccess("Saved", response.Message);
                }
            });
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
                    }).then(function(value) {
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
            console.log('Selected costomizable >>', vm.fixtureFittings);
            vm.customizableFixtureFittings = vm.fixtureFittings.filter(function (item) {
                return Number(item.CustomizableFnFsId) === Number(customizable.RecordId);
            });
            console.log('The customizable fixture fittings >>', vm.customizableFixtureFittings);
            setTimeout(function() {
                $(".image-picker").imagepicker();
            }, 1000);
        }

        vm.getTenureRange = function () {
            var ranges = [];
            for (var k = vm.minLoanTenure; k <= vm.maxLoanTenure; k++) {
                ranges.push(k);
            }
            return ranges;
        }    
        
        function loadDefaults() {
            vm.ajax = true;
            for (var k = 0, len = vm.customizables.length;k<len; k++) {
                var customizable = vm.customizables[k];
                console.log('The customizable is >>>', customizable);
                var fixtures = vm.fixtureFittings.filter(function (item) {
                    return Number(customizable.RecordId) === Number(item.CustomizableFnFsId) && item.IsDefault;
                });
               if (fixtures.length) {
                    vm.model.selectedFixtures["record" + customizable.RecordId] = fixtures[0];
                }  
            }
            updateInitialTotalCost();
            $scope.$digest();
            vm.ajax = false;
        }
        function retrieveSavedCustomizations () {
            var payload = {};
            payload.houseId = fullHouseId;
            services.retrieveSavedCustomization(payload, function (response) {
                if (response.status === "00") {
                    vm.model = response.data;
                }
            });
        } 
        

        loadLoanAmountLimits(); 
        loadCustomizables();
        loadFittingsFixtures(); 


        setTimeout(function() {
            loadDefaults();
            retrieveSavedCustomizations();
        }, 3000);  
    }


})(jQuery);

(function () {
    'use strict';
    angular
        .module('ubuild')
        .controller('UpdateProfileController', UpdateProfileController);
    UpdateProfileController.$inject = ['brudexservices', 'brudexutils', '$scope'];
    function UpdateProfileController(services, utils, $scope) {
        var vm = this;
        vm.errorMsg = [];
        vm.successMsg = [];
        vm.profile = {};
        vm.formSubmitted = false;
        vm.isReadonly = true;
        vm.profile.tokenSent = false;
        var tokenValidated = false;
        vm.ajax = false;
        vm.accountNotVerified = true;
        $scope.$watch("vm.profile.IsAccountHolder",
            function (newValue) {
                if (newValue == "No")
                    vm.isReadonly = false;
                else
                    vm.isReadonly = true;
            });

        vm.submitProfile = function (formValid) {
            console.log('form is valid', formValid);
            vm.formSubmitted = true;
            if (formValid) {
                try {
                    vm.ajax = true;
                    services.submitProfile(vm.profile,
                        function(response) {
                            console.log("Response from server >>", response);
                            if (response.Status === "00") {
                                utils.alertSuccess(response.Message);
                            }
                            vm.ajax = false;
                        });
                } catch (e) {
                    utils.alertError("An error occured. Please try again");
                }
            }
        }

        vm.saveAndNext = function (formValid, pageNo) {
            console.log('form is valid', formValid);
            if (true) {
                vm.ajax = true;
                var payload = { data: vm.profile, pageNo: pageNo }
                services.submitProfile(vm.profile, function (response) {
                    console.log("Response from server >>", response);
                    if (response.Status === "00") {
                        utils.alertSuccess(response.Message);
                        swal({
                            title: "Profile update Successful",
                            text: response.Message,
                            type: "success"
                        }).then(function () {
                            window.location.reload();
                            });

                    }
                    vm.ajax = false;
                });
            }
        }

        vm.sendToken = function () {
            var payload = { acctNo: vm.profile.AccountNumber };
            vm.ajax = true;
            services.sendTokenByAcctNo(payload, function (response) {
                if (response.Status === "00") {
                    utils.alertSuccess(response.Message);
                    vm.profile.tokenSent = true;
                } else {
                    utils.alertError(response.Message);
                }
                vm.ajax = false;
            });
        }

        vm.validateToken = function () {
            if (!tokenValidated) {
                vm.ajax = true;
                var payload = { acctNo: vm.profile.AccountNumber, token: vm.profile.TokenSMS };
                services.validateTokenByAcctNo(payload, function (response) {
                    console.log("response from validate token ...", response);
                    if (response.Status === "00") {
                        utils.alertSuccess(response.Message);
                        vm.isReadonly = false;
                        tokenValidated = true;
                        vm.accountNotVerified = false;
                        //getAccountInfo(payload.acctNo);
                    } else {
                        utils.alertError(response.Message);
                    }
                    vm.ajax = false;
                });
            } else {
                alert("Click continue");
            }
        }

        function getAccountInfo(acctNo) {
            console.log('getting account information >>>');
            vm.ajax = true;
            var payload = { allData: true };
            if (acctNo) {
                payload.acctNo = acctNo;
            }
            services.getAccountProfile(payload, function (response) {
                console.log("Account information is >>", response);
                if (response.Status === "00") {
                    Object.assign(vm.profile, response.data);
                    formatProfileData();
                }
                vm.ajax = false;
            });
        }



        function formatProfileData() {
            vm.profile.Gender = vm.profile.Gender.upper()[0];
        }

        

        vm.countriesList = {
            BD: "Bangladesh",
            BE: "Belgium",
            BF: "Burkina Faso",
            BG: "Bulgaria",
            BA: "Bosnia and Herzegovina",
            BB: "Barbados",
            WF: "Wallis and Futuna",
            BL: "Saint Barthelemy",
            BM: "Bermuda",
            BN: "Brunei",
            BO: "Bolivia",
            BH: "Bahrain",
            BI: "Burundi",
            BJ: "Benin",
            BT: "Bhutan",
            JM: "Jamaica",
            BV: "Bouvet Island",
            BW: "Botswana",
            WS: "Samoa",
            BQ: "Bonaire, Saint Eustatius and Saba ",
            BR: "Brazil",
            BS: "Bahamas",
            JE: "Jersey",
            BY: "Belarus",
            BZ: "Belize",
            RU: "Russia",
            RW: "Rwanda",
            RS: "Serbia",
            TL: "East Timor",
            RE: "Reunion",
            TM: "Turkmenistan",
            TJ: "Tajikistan",
            RO: "Romania",
            TK: "Tokelau",
            GW: "Guinea-Bissau",
            GU: "Guam",
            GT: "Guatemala",
            GS: "South Georgia and the South Sandwich Islands",
            GR: "Greece",
            GQ: "Equatorial Guinea",
            GP: "Guadeloupe",
            JP: "Japan",
            GY: "Guyana",
            GG: "Guernsey",
            GF: "French Guiana",
            GE: "Georgia",
            GD: "Grenada",
            GB: "United Kingdom",
            GA: "Gabon",
            SV: "El Salvador",
            GN: "Guinea",
            GM: "Gambia",
            GL: "Greenland",
            GI: "Gibraltar",
            GH: "Ghana",
            OM: "Oman",
            TN: "Tunisia",
            JO: "Jordan",
            HR: "Croatia",
            HT: "Haiti",
            HU: "Hungary",
            HK: "Hong Kong",
            HN: "Honduras",
            HM: "Heard Island and McDonald Islands",
            VE: "Venezuela",
            PR: "Puerto Rico",
            PS: "Palestinian Territory",
            PW: "Palau",
            PT: "Portugal",
            SJ: "Svalbard and Jan Mayen",
            PY: "Paraguay",
            IQ: "Iraq",
            PA: "Panama",
            PF: "French Polynesia",
            PG: "Papua New Guinea",
            PE: "Peru",
            PK: "Pakistan",
            PH: "Philippines",
            PN: "Pitcairn",
            PL: "Poland",
            PM: "Saint Pierre and Miquelon",
            ZM: "Zambia",
            EH: "Western Sahara",
            EE: "Estonia",
            EG: "Egypt",
            ZA: "South Africa",
            EC: "Ecuador",
            IT: "Italy",
            VN: "Vietnam",
            SB: "Solomon Islands",
            ET: "Ethiopia",
            SO: "Somalia",
            ZW: "Zimbabwe",
            SA: "Saudi Arabia",
            ES: "Spain",
            ER: "Eritrea",
            ME: "Montenegro",
            MD: "Moldova",
            MG: "Madagascar",
            MF: "Saint Martin",
            MA: "Morocco",
            MC: "Monaco",
            UZ: "Uzbekistan",
            MM: "Myanmar",
            ML: "Mali",
            MO: "Macao",
            MN: "Mongolia",
            MH: "Marshall Islands",
            MK: "Macedonia",
            MU: "Mauritius",
            MT: "Malta",
            MW: "Malawi",
            MV: "Maldives",
            MQ: "Martinique",
            MP: "Northern Mariana Islands",
            MS: "Montserrat",
            MR: "Mauritania",
            IM: "Isle of Man",
            UG: "Uganda",
            TZ: "Tanzania",
            MY: "Malaysia",
            MX: "Mexico",
            IL: "Israel",
            FR: "France",
            IO: "British Indian Ocean Territory",
            SH: "Saint Helena",
            FI: "Finland",
            FJ: "Fiji",
            FK: "Falkland Islands",
            FM: "Micronesia",
            FO: "Faroe Islands",
            NI: "Nicaragua",
            NL: "Netherlands",
            NO: "Norway",
            NA: "Namibia",
            VU: "Vanuatu",
            NC: "New Caledonia",
            NE: "Niger",
            NF: "Norfolk Island",
            NG: "Nigeria",
            NZ: "New Zealand",
            NP: "Nepal",
            NR: "Nauru",
            NU: "Niue",
            CK: "Cook Islands",
            XK: "Kosovo",
            CI: "Ivory Coast",
            CH: "Switzerland",
            CO: "Colombia",
            CN: "China",
            CM: "Cameroon",
            CL: "Chile",
            CC: "Cocos Islands",
            CA: "Canada",
            CG: "Republic of the Congo",
            CF: "Central African Republic",
            CD: "Democratic Republic of the Congo",
            CZ: "Czech Republic",
            CY: "Cyprus",
            CX: "Christmas Island",
            CR: "Costa Rica",
            CW: "Curacao",
            CV: "Cape Verde",
            CU: "Cuba",
            SZ: "Swaziland",
            SY: "Syria",
            SX: "Sint Maarten",
            KG: "Kyrgyzstan",
            KE: "Kenya",
            SS: "South Sudan",
            SR: "Suriname",
            KI: "Kiribati",
            KH: "Cambodia",
            KN: "Saint Kitts and Nevis",
            KM: "Comoros",
            ST: "Sao Tome and Principe",
            SK: "Slovakia",
            KR: "South Korea",
            SI: "Slovenia",
            KP: "North Korea",
            KW: "Kuwait",
            SN: "Senegal",
            SM: "San Marino",
            SL: "Sierra Leone",
            SC: "Seychelles",
            KZ: "Kazakhstan",
            KY: "Cayman Islands",
            SG: "Singapore",
            SE: "Sweden",
            SD: "Sudan",
            DO: "Dominican Republic",
            DM: "Dominica",
            DJ: "Djibouti",
            DK: "Denmark",
            VG: "British Virgin Islands",
            DE: "Germany",
            YE: "Yemen",
            DZ: "Algeria",
            US: "United States",
            UY: "Uruguay",
            YT: "Mayotte",
            UM: "United States Minor Outlying Islands",
            LB: "Lebanon",
            LC: "Saint Lucia",
            LA: "Laos",
            TV: "Tuvalu",
            TW: "Taiwan",
            TT: "Trinidad and Tobago",
            TR: "Turkey",
            LK: "Sri Lanka",
            LI: "Liechtenstein",
            LV: "Latvia",
            TO: "Tonga",
            LT: "Lithuania",
            LU: "Luxembourg",
            LR: "Liberia",
            LS: "Lesotho",
            TH: "Thailand",
            TF: "French Southern Territories",
            TG: "Togo",
            TD: "Chad",
            TC: "Turks and Caicos Islands",
            LY: "Libya",
            VA: "Vatican",
            VC: "Saint Vincent and the Grenadines",
            AE: "United Arab Emirates",
            AD: "Andorra",
            AG: "Antigua and Barbuda",
            AF: "Afghanistan",
            AI: "Anguilla",
            VI: "U.S. Virgin Islands",
            IS: "Iceland",
            IR: "Iran",
            AM: "Armenia",
            AL: "Albania",
            AO: "Angola",
            AQ: "Antarctica",
            AS: "American Samoa",
            AR: "Argentina",
            AU: "Australia",
            AT: "Austria",
            AW: "Aruba",
            IN: "India",
            AX: "Aland Islands",
            AZ: "Azerbaijan",
            IE: "Ireland",
            ID: "Indonesia",
            UA: "Ukraine",
            QA: "Qatar",
            MZ: "Mozambique"
        }
    }
})();

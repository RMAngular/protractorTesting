(function() {
    angular.module('app.components.address', [])
        .directive('address', addressDirective);

    function addressDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/address/address.html',
            scope: {
                isPhysical: '=',
                showErrors: '='
            },
            controller: Address,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    /*@ngInject*/
    function Address($filter) {
        var vm = this;

        vm.filterNonForeignCountries = filterNonForeignCountries;
        vm.getZipCodePattern = getZipCodePattern;
        vm.getZipCodeLabel = getZipCodeLabel;
        vm.postOfficeBoxRegEx = /(\b[P|p]*(OST|ost)*\.*\s*[O|o|0]*(ffice|FFICE)*\.*\s*[B|b][O|o|0][X|x]\b)/;
        vm.resetPhysicalCountry = resetCountry;
        vm.setPhysicalCountry = setCountry;

        function filterNonForeignCountries(value) {
            return !(value.id === 'US' || value.id === 'UM' || value.id === 'CA');
        }

        function getZipCodePattern(address) {
            var state;

            if (address) {
                if (!address.stateId || !vm.states || address.isForeign) {
                    return;
                }

                state = $filter('filter')(vm.states, {id: address.stateId})[0];

                switch (state.country) {
                    case 'US':
                        return vm.config.regex.zipCode;

                    case 'CA':
                        return vm.config.regex.zipCodeCanada;

                    default:
                        return /.*/;
                }
            }
        }

        function getZipCodeLabel(stateId) {
            var state;

            if (!stateId || !vm.states) {
                return 'Postal Code';
            }

            state = $filter('filter')(vm.states, {id: stateId})[0];

            switch (state.country) {
                case 'CA':
                    return 'Postal Code';

                default:
                    return 'Zip/Postal Code';
            }
        }

        function resetCountry(address) {
            address.countryId = null;
        }

        function setCountry(address) {
            if (address) {
                var state = $filter('filter')(vm.states, {id: address.stateId});
                if (state && state.length >= 1) {
                    vm.owner.countryId = state[0].country;
                } else {
                    vm.owner.countryId = undefined;
                }
            }
        }

        vm.states = [{
            'id': 'AA',
            'value': 'Armed Forces Americas',
            'country': 'US'
        }, {
            'id': 'AB',
            'value': 'Alberta',
            'country': 'CA'
        }, {
            'id': 'AE',
            'value': 'Armed Forces',
            'country': 'US'
        }, {
            'id': 'AK',
            'value': 'Alaska',
            'country': 'US'
        }, {
            'id': 'AL',
            'value': 'Alabama',
            'country': 'US'
        }, {
            'id': 'AP',
            'value': 'Military Pacific Region',
            'country': 'US'
        }, {
            'id': 'AR',
            'value': 'Arkansas',
            'country': 'US'
        }, {
            'id': 'AZ',
            'value': 'Arizona',
            'country': 'US'
        }, {
            'id': 'BC',
            'value': 'British Columbia',
            'country': 'CA'
        }, {
            'id': 'CA',
            'value': 'California',
            'country': 'US'
        }, {
            'id': 'CO',
            'value': 'Colorado',
            'country': 'US'
        }, {
            'id': 'CT',
            'value': 'Connecticut',
            'country': 'US'
        }, {
            'id': 'DC',
            'value': 'District Of Columbia',
            'country': 'US'
        }, {
            'id': 'DE',
            'value': 'Delaware',
            'country': 'US'
        }, {
            'id': 'FL',
            'value': 'Florida',
            'country': 'US'
        }, {
            'id': 'GA',
            'value': 'Georgia',
            'country': 'US'
        }, {
            'id': 'GU',
            'value': 'Guam',
            'country': 'US'
        }, {
            'id': 'HI',
            'value': 'Hawaii',
            'country': 'US'
        }, {
            'id': 'IA',
            'value': 'Iowa',
            'country': 'US'
        }, {
            'id': 'ID',
            'value': 'Idaho',
            'country': 'US'
        }, {
            'id': 'IL',
            'value': 'Illinois',
            'country': 'US'
        }, {
            'id': 'IN',
            'value': 'Indiana',
            'country': 'US'
        }, {
            'id': 'KS',
            'value': 'Kansas',
            'country': 'US'
        }, {
            'id': 'KY',
            'value': 'Kentucky',
            'country': 'US'
        }, {
            'id': 'LA',
            'value': 'Louisiana',
            'country': 'US'
        }, {
            'id': 'MA',
            'value': 'Massachusetts',
            'country': 'US'
        }, {
            'id': 'MB',
            'value': 'Manitoba',
            'country': 'CA'
        }, {
            'id': 'MD',
            'value': 'Maryland',
            'country': 'US'
        }, {
            'id': 'ME',
            'value': 'Maine',
            'country': 'US'
        }, {
            'id': 'MI',
            'value': 'Michigan',
            'country': 'US'
        }, {
            'id': 'MN',
            'value': 'Minnesota',
            'country': 'US'
        }, {
            'id': 'MO',
            'value': 'Missouri',
            'country': 'US'
        }, {
            'id': 'MS',
            'value': 'Mississippi',
            'country': 'US'
        }, {
            'id': 'MT',
            'value': 'Montana',
            'country': 'US'
        }, {
            'id': 'NB',
            'value': 'New Brunswick',
            'country': 'CA'
        }, {
            'id': 'NC',
            'value': 'North Carolina',
            'country': 'US'
        }, {
            'id': 'ND',
            'value': 'North Dakota',
            'country': 'US'
        }, {
            'id': 'NE',
            'value': 'Nebraska',
            'country': 'US'
        }, {
            'id': 'NH',
            'value': 'New Hampshire',
            'country': 'US'
        }, {
            'id': 'NJ',
            'value': 'New Jersey',
            'country': 'US'
        }, {
            'id': 'NL',
            'value': 'Newfoundland',
            'country': 'US'
        }, {
            'id': 'NM',
            'value': 'New Mexico',
            'country': 'US'
        }, {
            'id': 'NS',
            'value': 'Nova Scotia',
            'country': 'CA'
        }, {
            'id': 'NT',
            'value': 'Northwest Territories',
            'country': 'CA'
        }, {
            'id': 'NU',
            'value': 'Nunavut',
            'country': 'CA'
        }, {
            'id': 'NV',
            'value': 'Nevada',
            'country': 'US'
        }, {
            'id': 'NY',
            'value': 'New York',
            'country': 'US'
        }, {
            'id': 'OH',
            'value': 'Ohio',
            'country': 'US'
        }, {
            'id': 'OK',
            'value': 'Oklahoma',
            'country': 'US'
        }, {
            'id': 'ON',
            'value': 'Ontario',
            'country': 'CA'
        }, {
            'id': 'OR',
            'value': 'Oregon',
            'country': 'US'
        }, {
            'id': 'PA',
            'value': 'Pennsylvania',
            'country': 'US'
        }, {
            'id': 'PE',
            'value': 'Prince Edward Island',
            'country': 'CA'
        }, {
            'id': 'PR',
            'value': 'Puerto Rico',
            'country': 'US'
        }, {
            'id': 'QC',
            'value': 'Quebec',
            'country': 'CA'
        }, {
            'id': 'RI',
            'value': 'Rhode Island',
            'country': 'US'
        }, {
            'id': 'SC',
            'value': 'South Carolina',
            'country': 'US'
        }, {
            'id': 'SD',
            'value': 'South Dakota',
            'country': 'US'
        }, {
            'id': 'SK',
            'value': 'Saskatchewan',
            'country': 'CA'
        }, {
            'id': 'TN',
            'value': 'Tennessee',
            'country': 'US'
        }, {
            'id': 'TX',
            'value': 'Texas',
            'country': 'US'
        }, {
            'id': 'UT',
            'value': 'Utah',
            'country': 'US'
        }, {
            'id': 'VA',
            'value': 'Virginia',
            'country': 'US'
        }, {
            'id': 'VI',
            'value': 'Virgin Islands',
            'country': 'US'
        }, {
            'id': 'VT',
            'value': 'Vermont',
            'country': 'US'
        }, {
            'id': 'WA',
            'value': 'Washington',
            'country': 'US'
        }, {
            'id': 'WI',
            'value': 'Wisconsin',
            'country': 'US'
        }, {
            'id': 'WV',
            'value': 'West Virginia',
            'country': 'US'
        }, {
            'id': 'WY',
            'value': 'Wyoming',
            'country': 'US'
        }, {
            'id': 'YT',
            'value': 'Yukon Territory',
            'country': 'CA'
        }];
        vm.countries = [{
            'id': 'AF',
            'value': 'Afghanistan'
        }, {
            'id': 'AL',
            'value': 'Albania'
        }, {
            'id': 'DZ',
            'value': 'Algeria'
        }, {
            'id': 'AS',
            'value': 'American Samoa'
        }, {
            'id': 'AD',
            'value': 'Andorra'
        }, {
            'id': 'AO',
            'value': 'Angola'
        }, {
            'id': 'AI',
            'value': 'Anguilla'
        }, {
            'id': 'AQ',
            'value': 'Antarctica'
        }, {
            'id': 'AG',
            'value': 'Antigua and Barbuda'
        }, {
            'id': 'AR',
            'value': 'Argentina'
        }, {
            'id': 'AM',
            'value': 'Armenia'
        }, {
            'id': 'AW',
            'value': 'Aruba'
        }, {
            'id': 'AU',
            'value': 'Australia'
        }, {
            'id': 'AT',
            'value': 'Austria'
        }, {
            'id': 'AZ',
            'value': 'Azerbaijan'
        }, {
            'id': 'VI',
            'value': 'BRITISH VIRGIN ISLANDS'
        }, {
            'id': 'WI',
            'value': 'BRITISH WEST INDIES'
        }, {
            'id': 'BS',
            'value': 'Bahamas'
        }, {
            'id': 'BH',
            'value': 'Bahrain'
        }, {
            'id': 'BD',
            'value': 'Bangladesh'
        }, {
            'id': 'BB',
            'value': 'Barbados'
        }, {
            'id': 'BY',
            'value': 'Belarus'
        }, {
            'id': 'BE',
            'value': 'Belgium'
        }, {
            'id': 'BZ',
            'value': 'Belize'
        }, {
            'id': 'BJ',
            'value': 'Benin'
        }, {
            'id': 'BM',
            'value': 'Bermuda'
        }, {
            'id': 'BT',
            'value': 'Bhutan'
        }, {
            'id': 'BO',
            'value': 'Bolivia'
        }, {
            'id': 'BA',
            'value': 'Bosnia/Herzegovina'
        }, {
            'id': 'BW',
            'value': 'Botswana'
        }, {
            'id': 'BV',
            'value': 'Bouvet Island'
        }, {
            'id': 'BR',
            'value': 'Brazil'
        }, {
            'id': 'IO',
            'value': 'British Indian Ocean Territory'
        }, {
            'id': 'BN',
            'value': 'Brunei'
        }, {
            'id': 'BG',
            'value': 'Bulgaria'
        }, {
            'id': 'BF',
            'value': 'Burkina Faso'
        }, {
            'id': 'BU',
            'value': 'Burma'
        }, {
            'id': 'BI',
            'value': 'Burundi'
        }, {
            'id': 'KH',
            'value': 'Cambodia'
        }, {
            'id': 'CM',
            'value': 'Cameroon'
        }, {
            'id': 'CA',
            'value': 'Canada'
        }, {
            'id': 'CV',
            'value': 'Cape Verde'
        }, {
            'id': 'KY',
            'value': 'Cayman Islands'
        }, {
            'id': 'CF',
            'value': 'Central African Republic'
        }, {
            'id': 'CL',
            'value': 'Chile'
        }, {
            'id': 'CN',
            'value': 'China'
        }, {
            'id': 'CX',
            'value': 'Christmas Island'
        }, {
            'id': 'CO',
            'value': 'Colombia'
        }, {
            'id': 'DM',
            'value': 'Commonwealth of Dominica'
        }, {
            'id': 'KM',
            'value': 'Comoros'
        }, {
            'id': 'CG',
            'value': 'Congo'
        }, {
            'id': 'CK',
            'value': 'Cook Islands'
        }, {
            'id': 'CR',
            'value': 'Costa Rica'
        }, {
            'id': 'HR',
            'value': 'Croatia (Hrvatska)'
        }, {
            'id': 'CU',
            'value': 'Cuba'
        }, {
            'id': 'CC',
            'value': 'Curacao'
        }, {
            'id': 'CY',
            'value': 'Cyprus'
        }, {
            'id': 'CZ',
            'value': 'Czech Republic'
        }, {
            'id': 'CS',
            'value': 'Czechoslovakia'
        }, {
            'id': 'DK',
            'value': 'Denmark'
        }, {
            'id': 'DJ',
            'value': 'Djibouti'
        }, {
            'id': 'DO',
            'value': 'Dominican Republic'
        }, {
            'id': 'TP',
            'value': 'East Timor'
        }, {
            'id': 'EC',
            'value': 'Ecuador'
        }, {
            'id': 'EG',
            'value': 'Egypt'
        }, {
            'id': 'SV',
            'value': 'El Salvador'
        }, {
            'id': 'GQ',
            'value': 'Equatorial Guinea'
        }, {
            'id': 'ER',
            'value': 'Eritrea'
        }, {
            'id': 'EE',
            'value': 'Estonia'
        }, {
            'id': 'ET',
            'value': 'Ethiopia'
        }, {
            'id': 'EU',
            'value': 'Euro'
        }, {
            'id': 'XE',
            'value': 'European Institutions'
        }, {
            'id': 'FK',
            'value': 'Falkland Islands (Malvinas)'
        }, {
            'id': 'FO',
            'value': 'Faroe Islands'
        }, {
            'id': 'FJ',
            'value': 'Fiji'
        }, {
            'id': 'FI',
            'value': 'Finland'
        }, {
            'id': 'FL',
            'value': 'Finland'
        }, {
            'id': 'FR',
            'value': 'France'
        }, {
            'id': 'FX',
            'value': 'France Metropolitan'
        }, {
            'id': 'GF',
            'value': 'French Guiana'
        }, {
            'id': 'PF',
            'value': 'French Polynesia'
        }, {
            'id': 'TF',
            'value': 'French Southern Territories'
        }, {
            'id': 'GA',
            'value': 'Gabon'
        }, {
            'id': 'GM',
            'value': 'Gambia'
        }, {
            'id': 'GE',
            'value': 'Georgia'
        }, {
            'id': 'DE',
            'value': 'Germany'
        }, {
            'id': 'GH',
            'value': 'Ghana'
        }, {
            'id': 'GI',
            'value': 'Gibraltar'
        }, {
            'id': 'GB',
            'value': 'Great Britain'
        }, {
            'id': 'GR',
            'value': 'Greece'
        }, {
            'id': 'GL',
            'value': 'Greenland'
        }, {
            'id': 'GD',
            'value': 'Grenada'
        }, {
            'id': 'GP',
            'value': 'Guadeloupe'
        }, {
            'id': 'GU',
            'value': 'Guam'
        }, {
            'id': 'GT',
            'value': 'Guatemala'
        }, {
            'id': 'GN',
            'value': 'Guinea'
        }, {
            'id': 'GW',
            'value': 'Guinea-Bissau'
        }, {
            'id': 'GY',
            'value': 'Guyana'
        }, {
            'id': 'HT',
            'value': 'Haiti'
        }, {
            'id': 'HM',
            'value': 'Heard and McDonald Islands'
        }, {
            'id': 'HN',
            'value': 'Honduras'
        }, {
            'id': 'HK',
            'value': 'Hong Kong'
        }, {
            'id': 'HU',
            'value': 'Hungary'
        }, {
            'id': 'IS',
            'value': 'Iceland'
        }, {
            'id': 'IM',
            'value': 'Ilse of Man'
        }, {
            'id': 'IN',
            'value': 'India'
        }, {
            'id': 'IR',
            'value': 'Iran'
        }, {
            'id': 'IQ',
            'value': 'Iraq'
        }, {
            'id': 'IE',
            'value': 'Ireland'
        }, {
            'id': 'IL',
            'value': 'Israel'
        }, {
            'id': 'IT',
            'value': 'Italy'
        }, {
            'id': 'CI',
            'value': 'Ivory Coast'
        }, {
            'id': 'JA',
            'value': 'Jamacia'
        }, {
            'id': 'JM',
            'value': 'Jamaica'
        }, {
            'id': 'JP',
            'value': 'Japan'
        }, {
            'id': 'JE',
            'value': 'Jersey C.I.'
        }, {
            'id': 'JO',
            'value': 'Jordan'
        }, {
            'id': 'KE',
            'value': 'Kenya'
        }, {
            'id': 'KI',
            'value': 'Kiribati'
        }, {
            'id': 'KR',
            'value': 'Korea'
        }, {
            'id': 'KW',
            'value': 'Kuwait'
        }, {
            'id': 'KG',
            'value': 'Kyrgyzstan'
        }, {
            'id': 'LA',
            'value': 'Laos'
        }, {
            'id': 'LV',
            'value': 'Lativa'
        }, {
            'id': 'LB',
            'value': 'Lebanon'
        }, {
            'id': 'LS',
            'value': 'Lesotho'
        }, {
            'id': 'LR',
            'value': 'Liberia'
        }, {
            'id': 'LI',
            'value': 'Liechtenstein'
        }, {
            'id': 'LT',
            'value': 'Lithuania'
        }, {
            'id': 'LU',
            'value': 'Luxembourg'
        }, {
            'id': 'LY',
            'value': 'Lybia'
        }, {
            'id': 'MO',
            'value': 'Macao'
        }, {
            'id': 'MK',
            'value': 'Macedonia, The Former Yugoslov'
        }, {
            'id': 'MG',
            'value': 'Madagascar'
        }, {
            'id': 'MW',
            'value': 'Malawi'
        }, {
            'id': 'MY',
            'value': 'Malaysia'
        }, {
            'id': 'MV',
            'value': 'Maldives'
        }, {
            'id': 'ML',
            'value': 'Mali'
        }, {
            'id': 'MT',
            'value': 'Maltax'
        }, {
            'id': 'MH',
            'value': 'Marshall Islands'
        }, {
            'id': 'MQ',
            'value': 'Martinique'
        }, {
            'id': 'MR',
            'value': 'Mauritania'
        }, {
            'id': 'MU',
            'value': 'Mauritius'
        }, {
            'id': 'YT',
            'value': 'Mayotte'
        }, {
            'id': 'MX',
            'value': 'Mexico'
        }, {
            'id': 'FM',
            'value': 'Micronesia, Federated States of'
        }, {
            'id': 'MD',
            'value': 'Moldova, Republic of'
        }, {
            'id': 'MC',
            'value': 'Monaco'
        }, {
            'id': 'MN',
            'value': 'Mongolia'
        }, {
            'id': 'MS',
            'value': 'Montserrat'
        }, {
            'id': 'MA',
            'value': 'Morocco'
        }, {
            'id': 'MZ',
            'value': 'Mozambique'
        }, {
            'id': 'YY',
            'value': 'Multinational'
        }, {
            'id': 'MM',
            'value': 'Myanmar'
        }, {
            'id': 'NA',
            'value': 'Nambia'
        }, {
            'id': 'XO',
            'value': 'Nato, Shape'
        }, {
            'id': 'NR',
            'value': 'Nauru'
        }, {
            'id': 'NP',
            'value': 'Nepal'
        }, {
            'id': 'NV',
            'value': 'Netherlands'
        }, {
            'id': 'NL',
            'value': 'Netherlands'
        }, {
            'id': 'AN',
            'value': 'Netherlands Antilles'
        }, {
            'id': 'NC',
            'value': 'New Caledonia'
        }, {
            'id': 'NZ',
            'value': 'New Zealand'
        }, {
            'id': 'NI',
            'value': 'Nicaragua'
        }, {
            'id': 'NE',
            'value': 'Niger'
        }, {
            'id': 'NG',
            'value': 'Nigeria'
        }, {
            'id': 'NU',
            'value': 'Niue'
        }, {
            'id': 'NF',
            'value': 'Norfolk Island'
        }, {
            'id': 'KP',
            'value': 'North Korea'
        }, {
            'id': 'MP',
            'value': 'Northern Mariana Islands'
        }, {
            'id': 'NO',
            'value': 'Norway'
        }, {
            'id': 'OM',
            'value': 'Oman'
        }, {
            'id': 'OT',
            'value': 'Other'
        }, {
            'id': 'YD',
            'value': 'P.D.R. Of The Yemen'
        }, {
            'id': 'PK',
            'value': 'Pakistan'
        }, {
            'id': 'PW',
            'value': 'Palau'
        }, {
            'id': 'PS',
            'value': 'Palestinian Territory'
        }, {
            'id': 'PA',
            'value': 'Panama'
        }, {
            'id': 'PG',
            'value': 'Papua New Guinea'
        }, {
            'id': 'PY',
            'value': 'Paraguay'
        }, {
            'id': 'PE',
            'value': 'Peru'
        }, {
            'id': 'PH',
            'value': 'Philippines'
        }, {
            'id': 'PN',
            'value': 'Pitcairn'
        }, {
            'id': 'PL',
            'value': 'Poland'
        }, {
            'id': 'PT',
            'value': 'Portugal'
        }, {
            'id': 'PR',
            'value': 'Puerto Rico'
        }, {
            'id': 'QA',
            'value': 'Qatar'
        }, {
            'id': 'KZ',
            'value': 'Republic of Kazakhstan'
        }, {
            'id': 'RE',
            'value': 'Reunion'
        }, {
            'id': 'RH',
            'value': 'Rhodesia'
        }, {
            'id': 'RO',
            'value': 'Rumainia'
        }, {
            'id': 'RU',
            'value': 'Russian Federation'
        }, {
            'id': 'RW',
            'value': 'Rwanda'
        }, {
            'id': 'KN',
            'value': 'Saint Kitts and Nevis'
        }, {
            'id': 'LC',
            'value': 'Saint Lucia'
        }, {
            'id': 'VC',
            'value': 'Saint Vincent and the Grenadin'
        }, {
            'id': 'WS',
            'value': 'Samoa'
        }, {
            'id': 'SM',
            'value': 'San Marino'
        }, {
            'id': 'ST',
            'value': 'Sao Tome and Principe'
        }, {
            'id': 'SA',
            'value': 'Saudi Arabia'
        }, {
            'id': 'SN',
            'value': 'Senegal'
        }, {
            'id': 'SC',
            'value': 'Seychelles'
        }, {
            'id': 'SL',
            'value': 'Sierra Leone'
        }, {
            'id': 'SG',
            'value': 'Singapore'
        }, {
            'id': 'SK',
            'value': 'Slovakia'
        }, {
            'id': 'SI',
            'value': 'Slovenia'
        }, {
            'id': 'SB',
            'value': 'Solomon Islands'
        }, {
            'id': 'SO',
            'value': 'Somalia'
        }, {
            'id': 'ZA',
            'value': 'South Africa'
        }, {
            'id': 'GS',
            'value': 'South Georgia and the South SA'
        }, {
            'id': 'ES',
            'value': 'Spain'
        }, {
            'id': 'LK',
            'value': 'Sri Lanka'
        }, {
            'id': 'SH',
            'value': 'St. Helena'
        }, {
            'id': 'PM',
            'value': 'St. Pierre and Miquelon'
        }, {
            'id': 'SD',
            'value': 'Sudan'
        }, {
            'id': 'XS',
            'value': 'Supranational'
        }, {
            'id': 'SR',
            'value': 'Surinam'
        }, {
            'id': 'SJ',
            'value': 'Svalbard and Jan Mayen Islands'
        }, {
            'id': 'SE',
            'value': 'Sweden'
        }, {
            'id': 'SW',
            'value': 'Sweden'
        }, {
            'id': 'CH',
            'value': 'Switzerland'
        }, {
            'id': 'SY',
            'value': 'Syria'
        }, {
            'id': 'TW',
            'value': 'Taiwan'
        }, {
            'id': 'TJ',
            'value': 'Tajikistan'
        }, {
            'id': 'TZ',
            'value': 'Tanzania'
        }, {
            'id': 'TD',
            'value': 'Tchad'
        }, {
            'id': 'TH',
            'value': 'Thailand'
        }, {
            'id': 'TG',
            'value': 'Togo'
        }, {
            'id': 'TK',
            'value': 'Tokelau'
        }, {
            'id': 'TO',
            'value': 'Tonga'
        }, {
            'id': 'TT',
            'value': 'Trinidad and Tobago'
        }, {
            'id': 'TN',
            'value': 'Tunisia'
        }, {
            'id': 'TR',
            'value': 'Turkey'
        }, {
            'id': 'TM',
            'value': 'Turkmenistan'
        }, {
            'id': 'TC',
            'value': 'Turks and Caicos Islands'
        }, {
            'id': 'TV',
            'value': 'Tuvalu'
        }, {
            'id': 'UG',
            'value': 'Uganda'
        }, {
            'id': 'UA',
            'value': 'Ukraine'
        }, {
            'id': 'AE',
            'value': 'United Arab Emirates'
        }, {
            'id': 'UK',
            'value': 'United Kingdom'
        }, {
            'id': 'US',
            'value': 'United States'
        }, {
            'id': 'UM',
            'value': 'United States Minor Outlying I'
        }, {
            'id': 'HV',
            'value': 'Upper Volta'
        }, {
            'id': 'UY',
            'value': 'Uruguay'
        }, {
            'id': 'UZ',
            'value': 'Uzbekistan'
        }, {
            'id': 'VU',
            'value': 'Vanuatu'
        }, {
            'id': 'VA',
            'value': 'Vatican City State (Holysee)'
        }, {
            'id': 'VE',
            'value': 'Venezuela'
        }, {
            'id': 'VN',
            'value': 'Vietnam'
        }, {
            'id': 'VG',
            'value': 'Virgin Islands (British)'
        }, {
            'id': 'WF',
            'value': 'Wallis and Futuna Islands'
        }, {
            'id': 'YE',
            'value': 'Yemen'
        }, {
            'id': 'YU',
            'value': 'Yugoslavia'
        }, {
            'id': 'ZR',
            'value': 'Zaire'
        }, {
            'id': 'ZM',
            'value': 'Zambia'
        }, {
            'id': 'ZW',
            'value': 'Zimbabwe'
        }];
    }
})();

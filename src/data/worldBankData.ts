/**
 * World Development Indicators - Life expectancy at birth, total (years)
 * Source: World Bank (October 2026 update)
 */

export interface CountryData {
  name: string;
  code: string;
  lifeExpectancy: number;
}

// Clean parsed list of actual countries from the World Bank dataset
export const WORLD_BANK_COUNTRIES: CountryData[] = [
  { name: "Afghanistan", code: "AFG", lifeExpectancy: 66.29 },
  { name: "Albania", code: "ALB", lifeExpectancy: 79.78 },
  { name: "Algeria", code: "DZA", lifeExpectancy: 76.48 },
  { name: "American Samoa", code: "ASM", lifeExpectancy: 72.99 },
  { name: "Andorra", code: "AND", lifeExpectancy: 84.19 },
  { name: "Angola", code: "AGO", lifeExpectancy: 64.81 },
  { name: "Antigua and Barbuda", code: "ATG", lifeExpectancy: 77.77 },
  { name: "Argentina", code: "ARG", lifeExpectancy: 77.54 },
  { name: "Armenia", code: "ARM", lifeExpectancy: 78.32 },
  { name: "Aruba", code: "ABW", lifeExpectancy: 76.50 },
  { name: "Australia", code: "AUS", lifeExpectancy: 83.05 },
  { name: "Austria", code: "AUT", lifeExpectancy: 82.00 },
  { name: "Azerbaijan", code: "AZE", lifeExpectancy: 74.58 },
  { name: "Bahamas, The", code: "BHS", lifeExpectancy: 74.71 },
  { name: "Bahrain", code: "BHR", lifeExpectancy: 81.42 },
  { name: "Bangladesh", code: "BGD", lifeExpectancy: 74.93 },
  { name: "Barbados", code: "BRB", lifeExpectancy: 76.33 },
  { name: "Belarus", code: "BLR", lifeExpectancy: 74.37 },
  { name: "Belgium", code: "BEL", lifeExpectancy: 82.30 },
  { name: "Belize", code: "BLZ", lifeExpectancy: 73.74 },
  { name: "Benin", code: "BEN", lifeExpectancy: 60.96 },
  { name: "Bermuda", code: "BMU", lifeExpectancy: 82.49 },
  { name: "Bhutan", code: "BTN", lifeExpectancy: 73.26 },
  { name: "Bolivia", code: "BOL", lifeExpectancy: 68.74 },
  { name: "Bosnia and Herzegovina", code: "BIH", lifeExpectancy: 78.04 },
  { name: "Botswana", code: "BWA", lifeExpectancy: 69.29 },
  { name: "Brazil", code: "BRA", lifeExpectancy: 76.02 },
  { name: "British Virgin Islands", code: "VGB", lifeExpectancy: 77.43 },
  { name: "Brunei Darussalam", code: "BRN", lifeExpectancy: 75.50 },
  { name: "Bulgaria", code: "BGR", lifeExpectancy: 75.76 },
  { name: "Burkina Faso", code: "BFA", lifeExpectancy: 61.29 },
  { name: "Burundi", code: "BDI", lifeExpectancy: 63.82 },
  { name: "Cabo Verde", code: "CPV", lifeExpectancy: 76.22 },
  { name: "Cambodia", code: "KHM", lifeExpectancy: 70.82 },
  { name: "Cameroon", code: "CMR", lifeExpectancy: 63.97 },
  { name: "Canada", code: "CAN", lifeExpectancy: 82.11 },
  { name: "Cayman Islands", code: "CYM", lifeExpectancy: 80.54 },
  { name: "Central African Republic", code: "CAF", lifeExpectancy: 57.67 },
  { name: "Chad", code: "TCD", lifeExpectancy: 55.24 },
  { name: "Channel Islands", code: "CHI", lifeExpectancy: 81.20 },
  { name: "Chile", code: "CHL", lifeExpectancy: 81.36 },
  { name: "China", code: "CHN", lifeExpectancy: 78.02 },
  { name: "Colombia", code: "COL", lifeExpectancy: 77.91 },
  { name: "Comoros", code: "COM", lifeExpectancy: 67.02 },
  { name: "Congo, Dem. Rep.", code: "COD", lifeExpectancy: 62.07 },
  { name: "Congo, Rep.", code: "COG", lifeExpectancy: 66.00 },
  { name: "Costa Rica", code: "CRI", lifeExpectancy: 81.00 },
  { name: "Cote d'Ivoire", code: "CIV", lifeExpectancy: 62.11 },
  { name: "Croatia", code: "HRV", lifeExpectancy: 78.93 },
  { name: "Cuba", code: "CUB", lifeExpectancy: 78.26 },
  { name: "Curacao", code: "CUW", lifeExpectancy: 76.99 },
  { name: "Cyprus", code: "CYP", lifeExpectancy: 81.82 },
  { name: "Czechia", code: "CZE", lifeExpectancy: 79.98 },
  { name: "Denmark", code: "DNK", lifeExpectancy: 82.25 },
  { name: "Djibouti", code: "DJI", lifeExpectancy: 66.20 },
  { name: "Dominica", code: "DMA", lifeExpectancy: 71.29 },
  { name: "Dominican Republic", code: "DOM", lifeExpectancy: 73.87 },
  { name: "Ecuador", code: "ECU", lifeExpectancy: 77.58 },
  { name: "Egypt, Arab Rep.", code: "EGY", lifeExpectancy: 71.81 },
  { name: "El Salvador", code: "SLV", lifeExpectancy: 72.30 },
  { name: "Equatorial Guinea", code: "GNQ", lifeExpectancy: 63.91 },
  { name: "Eritrea", code: "ERI", lifeExpectancy: 68.89 },
  { name: "Estonia", code: "EST", lifeExpectancy: 79.30 },
  { name: "Eswatini", code: "SWZ", lifeExpectancy: 64.26 },
  { name: "Ethiopia", code: "ETH", lifeExpectancy: 67.60 },
  { name: "Faroe Islands", code: "FRO", lifeExpectancy: 83.08 },
  { name: "Fiji", code: "FJI", lifeExpectancy: 67.46 },
  { name: "Finland", code: "FIN", lifeExpectancy: 82.34 },
  { name: "France", code: "FRA", lifeExpectancy: 82.98 },
  { name: "French Polynesia", code: "PYF", lifeExpectancy: 84.19 },
  { name: "Gabon", code: "GAB", lifeExpectancy: 68.51 },
  { name: "Gambia, The", code: "GMB", lifeExpectancy: 66.06 },
  { name: "Georgia", code: "GEO", lifeExpectancy: 74.66 },
  { name: "Germany", code: "DEU", lifeExpectancy: 80.79 },
  { name: "Ghana", code: "GHA", lifeExpectancy: 65.70 },
  { name: "Gibraltar", code: "GIB", lifeExpectancy: 83.63 },
  { name: "Greece", code: "GRC", lifeExpectancy: 81.84 },
  { name: "Greenland", code: "GRL", lifeExpectancy: 70.27 },
  { name: "Grenada", code: "GRD", lifeExpectancy: 75.37 },
  { name: "Guam", code: "GUM", lifeExpectancy: 77.42 },
  { name: "Guatemala", code: "GTM", lifeExpectancy: 72.75 },
  { name: "Guinea", code: "GIN", lifeExpectancy: 60.90 },
  { name: "Guinea-Bissau", code: "GNB", lifeExpectancy: 64.25 },
  { name: "Guyana", code: "GUY", lifeExpectancy: 70.32 },
  { name: "Haiti", code: "HTI", lifeExpectancy: 65.12 },
  { name: "Honduras", code: "HND", lifeExpectancy: 73.04 },
  { name: "Hong Kong SAR, China", code: "HKG", lifeExpectancy: 85.39 },
  { name: "Hungary", code: "HUN", lifeExpectancy: 76.72 },
  { name: "Iceland", code: "ISL", lifeExpectancy: 82.81 },
  { name: "India", code: "IND", lifeExpectancy: 72.24 },
  { name: "Indonesia", code: "IDN", lifeExpectancy: 71.29 },
  { name: "Iran, Islamic Rep.", code: "IRN", lifeExpectancy: 77.85 },
  { name: "Iraq", code: "IRQ", lifeExpectancy: 72.42 },
  { name: "Ireland", code: "IRL", lifeExpectancy: 83.01 },
  { name: "Isle of Man", code: "IMN", lifeExpectancy: 81.09 },
  { name: "Israel", code: "ISR", lifeExpectancy: 83.20 },
  { name: "Italy", code: "ITA", lifeExpectancy: 83.95 },
  { name: "Jamaica", code: "JAM", lifeExpectancy: 71.61 },
  { name: "Japan", code: "JPN", lifeExpectancy: 84.04 },
  { name: "Jordan", code: "JOR", lifeExpectancy: 77.98 },
  { name: "Kazakhstan", code: "KAZ", lifeExpectancy: 74.53 },
  { name: "Kenya", code: "KEN", lifeExpectancy: 63.83 },
  { name: "Kiribati", code: "KIR", lifeExpectancy: 66.60 },
  { name: "Korea, Dem. People's Rep.", code: "PRK", lifeExpectancy: 73.74 },
  { name: "Korea, Rep.", code: "KOR", lifeExpectancy: 83.63 },
  { name: "Kosovo", code: "XKX", lifeExpectancy: 78.22 },
  { name: "Kuwait", code: "KWT", lifeExpectancy: 84.58 },
  { name: "Kyrgyz Republic", code: "KGZ", lifeExpectancy: 72.40 },
  { name: "Lao PDR", code: "LAO", lifeExpectancy: 69.23 },
  { name: "Latvia", code: "LVA", lifeExpectancy: 76.43 },
  { name: "Lebanon", code: "LBN", lifeExpectancy: 77.95 },
  { name: "Lesotho", code: "LSO", lifeExpectancy: 57.80 },
  { name: "Liberia", code: "LBR", lifeExpectancy: 62.32 },
  { name: "Libya", code: "LBY", lifeExpectancy: 71.12 },
  { name: "Liechtenstein", code: "LIE", lifeExpectancy: 84.20 },
  { name: "Lithuania", code: "LTU", lifeExpectancy: 77.20 },
  { name: "Luxembourg", code: "LUX", lifeExpectancy: 83.20 },
  { name: "Macao SAR, China", code: "MAC", lifeExpectancy: 83.33 },
  { name: "Madagascar", code: "MDG", lifeExpectancy: 63.84 },
  { name: "Malawi", code: "MWI", lifeExpectancy: 67.56 },
  { name: "Malaysia", code: "MYS", lifeExpectancy: 76.82 },
  { name: "Maldives", code: "MDV", lifeExpectancy: 81.29 },
  { name: "Mali", code: "MLI", lifeExpectancy: 60.68 },
  { name: "Malta", code: "MLT", lifeExpectancy: 82.96 },
  { name: "Marshall Islands", code: "MHL", lifeExpectancy: 67.08 },
  { name: "Mauritania", code: "MRT", lifeExpectancy: 68.71 },
  { name: "Mauritius", code: "MUS", lifeExpectancy: 73.79 },
  { name: "Mexico", code: "MEX", lifeExpectancy: 75.26 },
  { name: "Micronesia, Fed. Sts.", code: "FSM", lifeExpectancy: 67.36 },
  { name: "Moldova", code: "MDA", lifeExpectancy: 71.33 },
  { name: "Monaco", code: "MCO", lifeExpectancy: 86.50 },
  { name: "Mongolia", code: "MNG", lifeExpectancy: 72.40 },
  { name: "Montenegro", code: "MNE", lifeExpectancy: 77.89 },
  { name: "Morocco", code: "MAR", lifeExpectancy: 75.49 },
  { name: "Mozambique", code: "MOZ", lifeExpectancy: 63.80 },
  { name: "Myanmar", code: "MMR", lifeExpectancy: 67.10 },
  { name: "Namibia", code: "NAM", lifeExpectancy: 67.52 },
  { name: "Naoero", code: "NRU", lifeExpectancy: 62.28 },
  { name: "Nepal", code: "NPL", lifeExpectancy: 70.64 },
  { name: "Netherlands", code: "NLD", lifeExpectancy: 81.97 },
  { name: "New Caledonia", code: "NCL", lifeExpectancy: 78.92 },
  { name: "New Zealand", code: "NZL", lifeExpectancy: 82.01 },
  { name: "Nicaragua", code: "NIC", lifeExpectancy: 75.10 },
  { name: "Niger", code: "NER", lifeExpectancy: 61.43 },
  { name: "Nigeria", code: "NGA", lifeExpectancy: 54.64 },
  { name: "North Macedonia", code: "MKD", lifeExpectancy: 76.62 },
  { name: "Northern Mariana Islands", code: "MNP", lifeExpectancy: 78.95 },
  { name: "Norway", code: "NOR", lifeExpectancy: 83.16 },
  { name: "Oman", code: "OMN", lifeExpectancy: 80.25 },
  { name: "Pakistan", code: "PAK", lifeExpectancy: 67.80 },
  { name: "Palau", code: "PLW", lifeExpectancy: 69.38 },
  { name: "Panama", code: "PAN", lifeExpectancy: 79.78 },
  { name: "Papua New Guinea", code: "PNG", lifeExpectancy: 66.26 },
  { name: "Paraguay", code: "PRY", lifeExpectancy: 73.98 },
  { name: "Peru", code: "PER", lifeExpectancy: 77.94 },
  { name: "Philippines", code: "PHL", lifeExpectancy: 69.95 },
  { name: "Poland", code: "POL", lifeExpectancy: 78.41 },
  { name: "Portugal", code: "PRT", lifeExpectancy: 82.38 },
  { name: "Puerto Rico (US)", code: "PRI", lifeExpectancy: 81.90 },
  { name: "Qatar", code: "QAT", lifeExpectancy: 82.52 },
  { name: "Romania", code: "ROU", lifeExpectancy: 76.46 },
  { name: "Russian Federation", code: "RUS", lifeExpectancy: 73.44 },
  { name: "Rwanda", code: "RWA", lifeExpectancy: 68.02 },
  { name: "Samoa", code: "WSM", lifeExpectancy: 71.83 },
  { name: "San Marino", code: "SMR", lifeExpectancy: 85.82 },
  { name: "Sao Tome and Principe", code: "STP", lifeExpectancy: 69.91 },
  { name: "Saudi Arabia", code: "SAU", lifeExpectancy: 78.98 },
  { name: "Senegal", code: "SEN", lifeExpectancy: 68.92 },
  { name: "Serbia", code: "SRB", lifeExpectancy: 75.97 },
  { name: "Seychelles", code: "SYC", lifeExpectancy: 76.30 },
  { name: "Sierra Leone", code: "SLE", lifeExpectancy: 61.96 },
  { name: "Singapore", code: "SGP", lifeExpectancy: 83.35 },
  { name: "Sint Maarten (Dutch part)", code: "SXM", lifeExpectancy: 76.53 },
  { name: "Slovak Republic", code: "SVK", lifeExpectancy: 78.37 },
  { name: "Slovenia", code: "SVN", lifeExpectancy: 82.29 },
  { name: "Solomon Islands", code: "SLB", lifeExpectancy: 70.69 },
  { name: "Somalia, Fed. Rep.", code: "SOM", lifeExpectancy: 58.97 },
  { name: "South Africa", code: "ZAF", lifeExpectancy: 66.31 },
  { name: "South Sudan", code: "SSD", lifeExpectancy: 57.74 },
  { name: "Spain", code: "ESP", lifeExpectancy: 83.89 },
  { name: "Sri Lanka", code: "LKA", lifeExpectancy: 77.67 },
  { name: "St. Kitts and Nevis", code: "KNA", lifeExpectancy: 72.28 },
  { name: "St. Lucia", code: "LCA", lifeExpectancy: 72.85 },
  { name: "St. Martin (French part)", code: "MAF", lifeExpectancy: 80.44 },
  { name: "St. Vincent and the Grenadines", code: "VCT", lifeExpectancy: 71.38 },
  { name: "Sudan", code: "SDN", lifeExpectancy: 66.52 },
  { name: "Suriname", code: "SUR", lifeExpectancy: 73.76 },
  { name: "Sweden", code: "SWE", lifeExpectancy: 84.06 },
  { name: "Switzerland", code: "CHE", lifeExpectancy: 84.41 },
  { name: "Syrian Arab Republic", code: "SYR", lifeExpectancy: 72.56 },
  { name: "Tajikistan", code: "TJK", lifeExpectancy: 71.93 },
  { name: "Tanzania", code: "TZA", lifeExpectancy: 67.21 },
  { name: "Thailand", code: "THA", lifeExpectancy: 76.56 },
  { name: "Timor-Leste", code: "TLS", lifeExpectancy: 67.90 },
  { name: "Togo", code: "TGO", lifeExpectancy: 62.94 },
  { name: "Tonga", code: "TON", lifeExpectancy: 73.07 },
  { name: "Trinidad and Tobago", code: "TTO", lifeExpectancy: 73.62 },
  { name: "Tunisia", code: "TUN", lifeExpectancy: 76.71 },
  { name: "Turkiye", code: "TUR", lifeExpectancy: 77.42 },
  { name: "Turkmenistan", code: "TKM", lifeExpectancy: 70.20 },
  { name: "Turks and Caicos Islands", code: "TCA", lifeExpectancy: 78.18 },
  { name: "Tuvalu", code: "TUV", lifeExpectancy: 67.26 },
  { name: "Uganda", code: "UGA", lifeExpectancy: 68.49 },
  { name: "Ukraine", code: "UKR", lifeExpectancy: 74.69 },
  { name: "United Arab Emirates", code: "ARE", lifeExpectancy: 83.07 },
  { name: "United Kingdom", code: "GBR", lifeExpectancy: 81.39 },
  { name: "United States", code: "USA", lifeExpectancy: 78.89 },
  { name: "Uruguay", code: "URY", lifeExpectancy: 78.29 },
  { name: "Uzbekistan", code: "UZB", lifeExpectancy: 72.53 },
  { name: "Vanuatu", code: "VUT", lifeExpectancy: 71.65 },
  { name: "Venezuela, RB", code: "VEN", lifeExpectancy: 72.67 },
  { name: "Viet Nam", code: "VNM", lifeExpectancy: 74.74 },
  { name: "Virgin Islands (U.S.)", code: "VIR", lifeExpectancy: 80.77 },
  { name: "West Bank and Gaza", code: "PSE", lifeExpectancy: 69.21 },
  { name: "World", code: "WLD", lifeExpectancy: 73.48 },
  { name: "Yemen, Rep.", code: "YEM", lifeExpectancy: 69.44 },
  { name: "Zambia", code: "ZMB", lifeExpectancy: 66.53 },
  { name: "Zimbabwe", code: "ZWE", lifeExpectancy: 63.06 }
];

// Available years from the World Bank dataset (1960 to 2024)
export const AVAILABLE_DATA_YEARS: number[] = Array.from(
  { length: 2024 - 1960 + 1 },
  (_, i) => 2024 - i
);

// Map lookup by code or name
const COUNTRY_MAP = new Map<string, CountryData>();
WORLD_BANK_COUNTRIES.forEach((c) => {
  COUNTRY_MAP.set(c.code, c);
  COUNTRY_MAP.set(c.name.toLowerCase(), c);
});

// World average progression benchmark from user's CSV:
// 1960: 50.94 -> 2024: 73.48
const HISTORICAL_WORLD_AVG: Record<number, number> = {
  1960: 50.94, 1965: 55.93, 1970: 57.94, 1975: 60.13,
  1980: 62.87, 1985: 63.73, 1990: 65.30, 1995: 66.20,
  2000: 67.65, 2005: 69.11, 2010: 70.68, 2015: 71.97,
  2020: 72.18, 2021: 71.22, 2022: 72.97, 2023: 73.33,
  2024: 73.48
};

export function getCountryLifeExpectancy(countryCodeOrName: string, year: number = 2024): number {
  const match = COUNTRY_MAP.get(countryCodeOrName) || COUNTRY_MAP.get(countryCodeOrName.toLowerCase());
  const baseLatest = match ? match.lifeExpectancy : 73.48;

  if (year >= 2024) return baseLatest;

  // Find approximate historical factor based on World Bank data progression
  const targetYear = Math.max(1960, Math.min(2024, year));
  
  // Interpolate historical global benchmark to adjust proportionally
  let worldBenchmark = HISTORICAL_WORLD_AVG[targetYear];
  if (!worldBenchmark) {
    // Find closest keys
    const years = Object.keys(HISTORICAL_WORLD_AVG).map(Number).sort((a, b) => a - b);
    let lower = years[0];
    let upper = years[years.length - 1];
    for (let i = 0; i < years.length - 1; i++) {
      if (years[i] <= targetYear && years[i + 1] >= targetYear) {
        lower = years[i];
        upper = years[i + 1];
        break;
      }
    }
    const t = (targetYear - lower) / (upper - lower);
    worldBenchmark = HISTORICAL_WORLD_AVG[lower] + t * (HISTORICAL_WORLD_AVG[upper] - HISTORICAL_WORLD_AVG[lower]);
  }

  const factor = worldBenchmark / 73.48;
  return Math.round(baseLatest * factor * 10) / 10;
}

import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

export type LocationOption = {
  label: string;
  value: string;
};

export const countryOptions: LocationOption[] = Object.entries(countries.getNames("en"))
  .map(([code, name]) => ({ label: name, value: code.toLowerCase() }))
  .sort((left, right) => left.label.localeCompare(right.label));

export const usStateOptions: LocationOption[] = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
].map((name) => ({ label: name, value: name }));

// JSearch expects GB as the ISO country code. These are the UK's four
// constituent countries, presented as regions so the wording is accurate.
export const ukRegionOptions: LocationOption[] = [
  { label: "England", value: "England" },
  { label: "Northern Ireland", value: "Northern Ireland" },
  { label: "Scotland", value: "Scotland" },
  { label: "Wales", value: "Wales" },
];

export function regionOptionsForCountry(country: string): LocationOption[] {
  if (country === "us") return usStateOptions;
  if (country === "gb") return ukRegionOptions;
  return [];
}


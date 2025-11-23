export type Country = {
    name: string;
    code: string;
    flag: { plain: string; rounded: string; };
};

export type CountryCode = keyof typeof countriesMap;
export type LocalizationCountries = Record<CountryCode, Country>;

const countriesMap: Record<string, Country> = {
    nl: {
        name: "Netherlands",
        code: "nl",
        flag: {
            plain: "images/country-flags/flag-netherlands",
            rounded: "images/country-flags/rounded/flag-netherlands"
        }
    },
    fr: {
        name: "France",
        code: "fr",
        flag: {
            plain: "images/country-flags/flag-france",
            rounded: "images/country-flags/rounded/flag-france"
        }
    },
    de: {
        name: "Germany",
        code: "de",
        flag: {
            plain: "images/country-flags/flag-germany",
            rounded: "images/country-flags/rounded/flag-germany"
        }
    },
    pl: {
        name: "Poland",
        code: "pl",
        flag: {
            plain: "images/country-flags/flag-poland",
            rounded: "images/country-flags/rounded/flag-poland"
        }
    }
};

export const countries: LocalizationCountries = countriesMap as LocalizationCountries;

export function getCountry(code: CountryCode): Country | null {
    return countries[code] ?? null;
}

export function getCountries(): Country[] {
    return Object.values(countries);
}

interface LanguagesType { [key: string]: string; }

interface CurrenciesType {
  [key:string]: {
    name: string;
    symbol: string;
  }
}

export type CountryType = {
  languages: React.ReactElement<LanguagesType>;
  population: number;
  currencies: React.ReactElement<CurrenciesType>;
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  flags: {
    png: string;
    alt: string;
    svg: string;
  }
  continents: string[];
};
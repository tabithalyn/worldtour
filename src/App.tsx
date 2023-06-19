import { useState } from "react";
import { CountryType } from "./types";

function App(data:CountryType) {
  const [countryData, setCountryData] = useState([data]);
  const [searchCountry, setSearchCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const countrySearch = (e: { key: string; }) => {
    if (e.key === "Enter" && searchCountry.length !== 0) {
      fetch(`https://restcountries.com/v3.1/name/${searchCountry}?fullText=true`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          return Promise.reject(setErrorMessage("Country not found. Try again."));
        }
      })
      .then((data) => {
        setCountryData(data);
        console.log(data);
      })
    }
  }

  return (
    <>
      <div className="w-full flex justify-center flex-wrap">
        <div className="flex w-full justify-center flex-wrap">
          <input
            type="text"
            className="countryQuery w-3/4 m-3 p-3 border-2 border-neutral-200"
            value={searchCountry}
            onChange={e => setSearchCountry(e.target.value)}
            onKeyDown={countrySearch}
            placeholder="Search for a country..."
            autoFocus
            required
          />
          {errorMessage && (
            <div className="w-3/5 p-4 bg-red-300 text-lg mb-4">{errorMessage}</div>
          )}
        </div>
        <div className="w-2/4 flex justify-center">
        {countryData ? (
            countryData.map((country:CountryType) => (
              <div key="{country}" className="w-full flex flex-wrap">
                <div className="flex flex-wrap w-full">
                  <div className="w-1/2 flex justify-center place-items-center text-4xl py-2 bg-gray-400">{country.name?.common}</div>
                  <div className="w-1/2 flex justify-center"><img src={country.flags?.svg.toString()} className="w-full" /></div>
                </div>

                <div className="w-1/2 p-4 flex flex-wrap justify-center bg-amber-300">
                <div className="w-full pt-2 pb-1 tracking-wider font-light text-sm uppercase flex justify-center">Capital</div>{country.capital}</div>
                <div className="w-1/2 p-4 flex flex-wrap justify-center bg-teal-400">
                <div className="w-full pt-2 pb-1 tracking-wider font-light text-sm uppercase flex justify-center">Continent</div>{country.continents}</div>

                <div className="w-1/2 p-4 flex flex-wrap justify-center bg-green-400">
                <div className="w-full pt-2 pb-1 tracking-wider font-light text-sm uppercase flex justify-center">Population</div>{country.population?.toLocaleString()}</div>
                <div className="w-1/2 py-4 pl-2 flex flex-wrap justify-center bg-rose-400">
                <div className="w-full pt-2 pb-1 tracking-wider font-light text-sm uppercase flex justify-center">Currency</div>{Object.values(country.currencies || {}).map(({name}) => name).join(', ')}
                <span className="ml-1">{Object.values(country.currencies || {}).map(({symbol}) => symbol)}</span>
                <span className="ml-1">{Object.keys(country.currencies || {}).map((key) => key)}</span></div>
                
                <div className="w-full p-4 flex flex-wrap justify-center bg-amber-500">
                <div className="w-full pt-2 pb-1 tracking-wider font-light text-sm uppercase flex justify-center">Languages</div>{Object.values(country.languages || {}).join(", ")}</div>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;

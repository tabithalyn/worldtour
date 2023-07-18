import { useState } from "react";
import { CountryType } from "./types";

function App(data:CountryType) {
  const [countryData, setCountryData] = useState([data]);
  const [searchCountry, setSearchCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  // window.onload = () => {
  //   const countryThing = document.querySelector(".country-data");
  //   countryThing?.classList.add("hidden");
  //   if (searchCountry.length !== 0) {
  //     countryThing?.classList.remove("hidden");
  //     countryThing?.classList.add("flex");
  //   }
  // }

  const countrySearch = (e: { key: string; }) => {
    if (e.key === "Enter" && searchCountry.length !== 0) {
      fetch(`https://restcountries.com/v3.1/name/${searchCountry}?fullText=true`)
      .then((res) => {
        if (res.ok) {
          setErrorMessage("");
          return res.json();
        } else if (res.status === 404) {
          return Promise.reject(setErrorMessage("Country not found. Try again."));
        }
      })
      .then((data) => {
        setCountryData(data);
        setIsSearched(true);
      })
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-purple-100 to-pink-100 flex items-center">
      <div className="w-full flex justify-center flex-wrap">
        <div className="flex w-full justify-center flex-wrap">
          <input
            type="text"
            className="countryQuery xs:w-4/5 sm:w-3/5 md:w-2/5 m-3 p-3 border-2 border-purple-200 rounded-full"
            value={searchCountry}
            onChange={e => setSearchCountry(e.target.value)}
            onKeyDown={countrySearch}
            placeholder="Search for a country..."
            autoFocus
            required
          />
          {errorMessage && (
            <div className="w-3/5 p-4 bg-[#fc5380] text-lg mb-4 rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>
        {countryData && isSearched ? (
        <div className="w-2/4 xs:w-4/5 justify-center country-data">
            { countryData.map((country:CountryType) => (
              <div key="{country}" className="w-full flex flex-wrap ">
                <div className="flex flex-wrap w-full">
                  <div className="w-full flex justify-center place-items-center xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl py-2">
                    <span className="bg-indigo-200 p-2 rounded-md text-white drop-shadow-lg shadow-sharp-indigo">{country.name?.common}</span>
                    <img src={country.flags?.svg.toString()} className="xs:w-3/12 md:w-2/12 lg:w-2/12 p-4 rounded-md drop-shadow-lg" />
                  </div>
                </div>

                <div className="w-1/2 xs:w-full p-4 flex flex-wrap justify-center">
                  <div className="pt-2 pb-1 tracking-widest md:text-lg lg:text-xl uppercase flex justify-center">
                    <span className="bg-purple-400 p-1 rounded-md text-pink-50 shadow-sharp-purple">Capital</span>
                  </div>
                  <span className="px-4 pt-1 text-lg flex items-center">{country.capital}</span>
                </div>

                <div className="w-1/2 xs:w-full p-4 flex flex-wrap justify-center">
                  <div className="pt-2 pb-1 tracking-widest md:text-lg lg:text-xl uppercase flex justify-center">
                    <span className="bg-indigo-400 p-1 rounded-md text-pink-50 shadow-sharp-indigo2">Continent</span>
                  </div>
                  <span className="px-4 pt-1 text-lg flex items-center">{country.continents}</span>
                </div>

                <div className="w-1/2 xs:w-full p-4 flex flex-wrap justify-center">
                  <div className="pt-2 pb-1 tracking-widest md:text-lg lg:text-xl uppercase flex justify-center">
                    <span className="bg-pink-400 p-1 rounded-md text-pink-50 shadow-sharp-pink">Population</span>
                  </div>
                  <span className="px-4 pt-1 text-lg flex items-center">{country.population?.toLocaleString()}</span>
                </div>

                <div className="w-1/2 xs:w-full p-4 flex flex-wrap justify-center">
                  <div className="pt-2 pb-1 tracking-widest md:text-lg lg:text-xl uppercase flex justify-center">
                    <span className="bg-rose-400 p-1 rounded-md text-pink-50 shadow-sharp-rose">Currencies</span>
                  </div>
                  <span className="px-4 pt-1 text-lg flex items-center">
                    {Object.values(country.currencies || {}).map(({name}) => name).join(', ')}
                    <span className="px-2">&rarr;</span>
                    <span className="ml-1">
                      {Object.values(country.currencies || {}).map(({symbol}) => symbol)}
                    </span>
                    <span className="ml-1">
                      {Object.keys(country.currencies || {}).map((key) => key)}
                    </span>
                  </span>
                </div>
                
                <div className="w-1/2 xs:w-full p-4 flex flex-wrap justify-center">
                  <div className="pt-2 pb-1 tracking-widest md:text-lg lg:text-xl uppercase flex justify-center">
                    <span className="bg-rose-300 p-1 rounded-md text-pink-50 shadow-sharp-rose2">Languages</span>
                  </div>
                  <span className="px-4 pt-1 text-lg flex items-center">
                    {Object.values(country.languages || {}).join(", ")}
                  </span>
                </div>
              </div>
            ))}
          </div>) : null
          }
      </div>
    </div>
  );
}

export default App;

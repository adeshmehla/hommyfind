"use client";
import { houseContext } from "@/context/context";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import CityDropdown from "./CityDropdown";
// import CityDropdown from "./CityDropdown";

const SearchBar = ({ onToggleDropdown, onCityChange, onChange, disableRedirect,searchWidth }) => {
  const { searchText, setSearchText, setLocationCity, setLocationRegion, locationCity, locationRegion } =
    useContext(houseContext);
  const router = useRouter();
  const SearchParams = useSearchParams();
  const city = SearchParams.get("city");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cities, setCities] = useState([
    { name: "New York", country: "USA" },
    { name: "Los Angeles", country: "USA" },
    { name: "Chicago", country: "USA" },
    { name: "Houston", country: "USA" },
    { name: "Phoenix", country: "USA" },
    { name: "Philadelphia", country: "USA" },
    { name: "San Antonio", country: "USA" },
    { name: "San Diego", country: "USA" },
    { name: "Dallas", country: "USA" },
    { name: "San Jose", country: "USA" },
    { name: "Toronto", country: "Canada" },
    { name: "Vancouver", country: "Canada" },
    { name: "Montreal", country: "Canada" },
    { name: "Calgary", country: "Canada" },
    { name: "Ottawa", country: "Canada" },
    { name: "Edmonton", country: "Canada" },
    { name: "Quebec City", country: "Canada" },
    { name: "Winnipeg", country: "Canada" },
    { name: "Hamilton", country: "Canada" },
    { name: "Victoria", country: "Canada" },
    { name: "London", country: "UK" },
    { name: "Manchester", country: "UK" },
    { name: "Birmingham", country: "UK" },
    { name: "Leeds", country: "UK" },
    { name: "Glasgow", country: "UK" },
    { name: "Liverpool", country: "UK" },
    { name: "Bristol", country: "UK" },
    { name: "Edinburgh", country: "UK" },
    { name: "Sheffield", country: "UK" },
    { name: "Dublin", country: "Ireland" },
  ]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("selectedCity", locationCity);
    sessionStorage.setItem("selectedRegion", locationRegion);
  }, [locationCity, locationRegion]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const citiesResponse = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}api/cities?pagination[page]=1&pagination[pageSize]=1000`
  //       );
  //       const citiesData = await citiesResponse.json();
  //       const citiesWithSlugs = citiesData.data.map((city) => ({
  //         name: city.attributes.Name,
  //         slug: city.attributes.CitySlug,
  //         country: city.attributes.Country,
  //       }));

  //       setCities(citiesWithSlugs);
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     const urlSearchParams = new URLSearchParams(window.location.search);
  //     const params = Object.fromEntries(urlSearchParams.entries());
  //     delete params["page"];
  //     window.history.replaceState(
  //       null,
  //       null,
  //       "?" + new URLSearchParams(params).toString()
  //     );
  //   }
  // };

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCitySelect = (city) => {
    if (city) {
      // if (!disableRedirect) {
      //   router.push(`/properties?city=${city}`);
      // }
      setLocationCity(city.name);
      setLocationRegion(city.country);
      setIsDropdownVisible(false);
      setSearchText("");
      // onCityChange(city);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative pt-4 w-full max-w-2xl mx-auto w-[${searchWidth}] h-30`}>
  <div className="flex items-center bg-white rounded-full shadow-lg">
    <input
      type="text"
      className="flex-1 pl-6 pr-4 py-4 rounded-l-full border-0 text-xl bg-white placeholder-gray-500 focus:ring-0 focus:outline-none"
      placeholder="Enter an address, neighborhood, city, or ZIP code"
      value={searchText}
      onChange={(e) => {
        const city = e.target.value;
        setSearchText(city);
        setIsDropdownVisible(true);
      }}
      onClick={toggleDropdownVisibility}
    />
    <button className="px-8 py-4 bg-orange-500 text-white text-xl font-semibold rounded-full hover:bg-orange-600 transition-colors">
      Search
    </button>
  </div>

  {isDropdownVisible && (
    <div ref={dropdownRef} className="absolute mt-2 w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <CityDropdown
        cities={cities}
        onCitySelect={handleCitySelect}
        filterText={searchText}
      />
    </div>
  )}
</div>
  );
};

export default SearchBar;

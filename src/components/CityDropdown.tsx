import React from 'react';

function CityDropdown({ cities, onCitySelect, filterText  }:any) {

  const filteredCities = cities.filter((city: { name: string; })=>
    city.name.toLowerCase().includes(filterText.toLowerCase())
 ); 

 return (
    <div className="city-dropdown block absolute mx-3 md:mx-0 bg-white border border-gray-200 rounded-xl shadow-md w-[16rem] md:w-60 z-10 overflow-y-auto max-h-[200px] md:max-h-[300px] hide-scrollbar text-gray-600">
      {filteredCities.map((city: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; country: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
        <div key={index} className="p-2 px-5 rounded-xl cursor-pointer w-auto truncate hover:bg-gray-200 border-b" onClick={() => onCitySelect(city)}>
          {city.name}, {city.country}
        </div>
      ))}
    </div>
 );
}

export default CityDropdown;

"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";

const TourSearchForm = () => {
  const router = useRouter();

  const [dates, setDates] = useState(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [searchLocation, setSearchLocation] = useState("");

  const [cities, setCities] = useState([]);

  const handleSearch = () => {
    if (searchLocation && dates) {
      router.push(`/trips?city=${searchLocation}&dates=${dates}`);
    }
  };

  const searchCities = async (searchQuery: string) => {
    if (searchQuery) {
      const response = await fetch(
        `https://secure.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=kishan&style=SHORT`
      );
      const parsed = await response.json();
      setCities(
        parsed?.geonames.map((city: { name: string }) => city.name) ?? []
      );
    } else {
      setCities([]);
    }
  };

  return (
    <div className="w-3/5 flex flex-row gap-5 px-5 my-5">
      <div className="h-full w-full relative">
        <div className=" absolute w-full bg-black bg-opacity-50 rounded-lg top-16 z-10 ">
          {cities.length > 0 && (
            <ul className=" list-none gap-2 flex flex-col p-4">
              {cities.map((city) => (
                <li
                  key={city}
                  className="text-white p-1 border-b-1 hover:bg-slate-500 hover:bg-opacity-25 rounded-lg cursor-pointer "
                  onClick={() => {
                    setSearchLocation(city);
                    setCities([]);
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Input
          color="danger"
          variant="bordered"
          className="text-white placeholder:text-white relative"
          startContent={<FaSearch />}
          value={searchLocation}
          onChange={(e) => {
            setSearchLocation(e.target.value);
            searchCities(e.target.value);
          }}
          placeholder="Search Location"
          classNames={{
            input: ["placeholder:text-white"],
          }}
        />
      </div>
      <Input
        type="date"
        placeholder="Dates"
        variant="bordered"
        color="danger"
        className="text-white accent-danger-500"
        startContent={<FaCalendarAlt />}
        value={dates}
        onChange={(e) => setDates(e.target.value)}
      />
      <Button
        size="lg"
        className="h-full w-full cursor-pointer"
        color="danger"
        variant="shadow"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default TourSearchForm;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../assets/css/WeatherSearch.module.css";
import { Location } from "@/context/LocationContext";

type WeatherSearchProps = {
  setLocation:React.Dispatch<React.SetStateAction<Location>>
}

export default function WeatherSearch({setLocation}:WeatherSearchProps) {
  const [locationInput, setLocationInput] = useState({
    input: "",
    is_hidden: true
  });
  const [locationSuggestions, setLocationSuggestions] = useState<Location[]>();
  

  const getLocationInfo = async (params: string) => {
    if(params === ""){
      return;
    }
    const res = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: params,
          count: 5,
        },
      }
    );
    setLocationSuggestions(
      res.data.results.map((data: any) => ({
        country: data.country,
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
      }))
    );
    return;
  };

  const setupWeatherLocation = async (l:Location) => {
    setLocation(l);
    setLocationInput((e) => ({...e, is_hidden: true}))
  }

  const search = async () => {
    setLocationInput((e) => ({...e, is_hidden: false}));
    getLocationInfo(locationInput.input)
  }

  // Init
  useEffect(() => {
    getLocationInfo(locationInput.input);
    return () => {};
  }, []);

  return (
    <form className={styles["cta"]} onSubmit={(e) => {
      e.preventDefault()
      search()
    }}>
      <div className={`${styles["cta__search-bar"]}`}>
        <input
          className="text-preset-5-medium"
          type="text"
          name=""
          id=""
          placeholder="Search for a place"
          value={locationInput.input}
          onChange={(e) => setLocationInput((prev) => ({...prev, input: e.target.value}))}
        />
        <div className={`text-preset-7 ${styles.cta__options} ${locationInput.is_hidden && "hide"}`}>
          {locationSuggestions?.map((e, index) => (
            <p onClick={() => setupWeatherLocation(e)} key={index}>{e.name}, {e.country}</p>
          ))}
        </div>
      </div>
      <button type="submit" className="btn text-preset-5-medium">
        Search
      </button>
    </form>
  );
}

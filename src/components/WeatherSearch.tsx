import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../assets/css/WeatherSearch.module.css";
import { Location } from "@/context/LocationContext";
import {useOutsideAlerter, WithIsHidden} from "../utility/detect-component";
import commonConstant from "../common-constant.json";

type WeatherSearchProps = {
  setLocation:React.Dispatch<React.SetStateAction<Location>>
}

type LocationInput = WithIsHidden<{
  input: string;
}>;

export default function WeatherSearch({setLocation}:WeatherSearchProps) {
  const searchBarRef = useRef(null);
  
  const [locationInput, setLocationInput] = useState<LocationInput>({
    input: "",
    is_hidden: true
  });

  useOutsideAlerter(searchBarRef, setLocationInput);

  const [locationSuggestions, setLocationSuggestions] = useState<Location[]>([]);
  const getLocationInfo = async (params: string) => {
    console.log(params)
    if(params === ""){
      setLocationSuggestions([]);
      return;
    }
    const res = await axios.get(
      commonConstant.OPEN_GEOCODING_API_URL,
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
    setLocationInput((e) => ({input: "", is_hidden: true}))
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
    }} ref={locationInput.is_hidden === false ? searchBarRef : null}>
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
          {
            locationSuggestions?.length !== 0 ? locationSuggestions?.map((e, index) => (
            <p onClick={() => setupWeatherLocation(e)} key={index} className={styles["cta__options__text"]}>{e.name}, {e.country}</p>
            )) : 
            <p>No location found</p>
          }
        </div>
      </div>
      <button type="submit" className="btn text-preset-5-medium">
        Search
      </button>
    </form>
  );
}

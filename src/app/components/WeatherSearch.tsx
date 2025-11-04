import axios from 'axios';
import React, { useEffect } from 'react'
import styles from "../../assets/css/WeatherSearch.module.css";

export default function WeatherSearch() {
  const locationParam: string = "medan";

  const getLocationInfo = async (params: string) => {
    const res = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: params,
        },
      }
    );
    console.log(res.data.results);
  };
  
  // Init
  useEffect(() => {
    getLocationInfo(locationParam);
    return () => {};
  }, []);  

  return (
    <section className={`${styles["cta"]}`}>
        <h1 className="text-preset-2">How's the sky looking today?</h1>
        <div className={`${styles["cta__search-bar"]}`}>
            <input
            className="text-preset-5-medium"
            type="text"
            name=""
            id=""
            placeholder="Search for a place"
            />
            <button type="button" className="btn text-preset-5-medium">
            Search
            </button>
        </div>
    </section>
  )
}

"use client";
import React, { useEffect, useState } from "react";
import { UnitSettingsContext, UnitSettingsContextType } from "../context/UnitSettingsContext";
import WeatherSearch, {Location} from "../components/WeatherSearch";
import WeatherInfo from "../components/WeatherInfo";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import styles from "../../assets/css/WeatherPage.module.css";

export default function WeatherPage() {
  const [location, setLocation] = useState<Location>({
    country: "Indonesia",
    name: "Jakarta",
    latitude: -6.1818,
    longitude: 106.8223,
  });

  const getCurrentLocation = async () => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos:any) {
      const crd = pos.coords;
      // console.log(crd)
      setLocation((prev) => ({...prev, latitude: crd.latitude, longitude: crd.longitude}));
    }

    function error(err:any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error, options);
    }else{
      console.log("User did not gave permision")
      return;
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []) 

  return (
    <section className={styles["home"]}>
      <WeatherSearch setLocation={setLocation}/>
      <WeatherInfo location={location}/>
      <DailyForecast location={location}/>
      <HourlyForecast location={location}/>
    </section>
  );
}

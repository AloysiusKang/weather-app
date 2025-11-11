"use client";
import Header from "../components/Header";
import {
  UnitSettings,
  UnitSettingsContext,
  UnitSettingsProvider,
} from "../context/UnitSettingsContext";
import commonConstant from "../common-constant.json";
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import WeatherSearch, {Location} from "../components/WeatherSearch";
import WeatherInfo from "@/components/WeatherInfo";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import { getCurrentLocation, LocationContext, LocationContextProvider } from "@/context/LocationContext";

export default function Home() {
  const {currLocation, setCurrLocation} = useContext(LocationContext);
  const [location, setLocation] = useState<Location>(currLocation);

  useEffect(() => {
    getCurrentLocation(setCurrLocation);
  }, []) 

  return (
    <UnitSettingsProvider>
      <LocationContextProvider>
        <Header />
        <section className={"home"}>
          <WeatherSearch setLocation={setLocation}/>
          <WeatherInfo location={location}/>
          <DailyForecast location={location}/>
          <HourlyForecast location={location}/>
        </section>
        <Footer />
      </LocationContextProvider>
    </UnitSettingsProvider>
  );
}

"use client";
import WeatherPage from "./pages/WeatherPage";
import Header from "./components/Header";
import {
  UnitSettings,
  UnitSettingsContext,
} from "./context/UnitSettingsContext";
import commonConstant from "./common-constant.json";
import { useContext, useState } from "react";
import Footer from "./components/Footer";

export default function Home() {
  const [unitSettings, setUnitSettings] = useState<UnitSettings>({
    temperature: commonConstant.TEMPERATURE_CELSIUS,
    wind_speed: commonConstant.WINDSPEED_KM,
    precipitation: commonConstant.PRECIPITATION_MM,
  });

  return (
    <>
      <UnitSettingsContext.Provider
        value={{
          unitSettings: unitSettings,
          setUnitSettingsContext: setUnitSettings,
        }}
      >
        <Header />
        <WeatherPage />
        <Footer />
      </UnitSettingsContext.Provider>
    </>
  );
}

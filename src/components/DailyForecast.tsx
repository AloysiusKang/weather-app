import React, { useContext, useEffect, useRef, useState } from "react";
import {
  UnitSettingsContext,
  UnitSettingsContextType,
} from "../context/UnitSettingsContext";
import { fetchWeatherApi } from "openmeteo";
import { format } from "date-fns";
import { weatherCode } from "../utility/weather-code";
import commonConstant from "../common-constant.json"
import styles from "../assets/css/DailyForecast.module.css";
import { Location, LocationContext } from "@/context/LocationContext";

type DailyForecast = {
  day: string;
  weather_code: number;
  temperature_max: number;
  temperature_min: number;
};

type DailyForecastProps = {
  location:Location
}

export default function DailyForecast({location}:DailyForecastProps) {
  const url = commonConstant.OPEN_API_URL;
  const hasPageRenderedOnce = useRef<Boolean>(false);
  const { unitSettings, setUnitSettingsContext }: UnitSettingsContextType =
    useContext(UnitSettingsContext);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>();
  const dailyForecastParams = {
    latitude: location.latitude,
    longitude: location.longitude,
    temperature_unit: unitSettings.temperature,
    wind_speed_unit: unitSettings.wind_speed,
    precipitation_unit: unitSettings.precipitation,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    timezone: "auto",
    forecast_days: 7,
  };

  const getDailyForecast = async (url: string) => {
    const res = await fetchWeatherApi(url, dailyForecastParams);
    const response = res[0];
    const daily = response.daily()!;

    let dailyForecastData = [];
    const currDate = new Date();
    for (let index = 0; index < dailyForecastParams.forecast_days; index++) {
      const forecastDay = new Date(currDate);
      forecastDay.setDate(currDate.getDate() + index);

      dailyForecastData.push({
        day: format(forecastDay, "EEE"),
        weather_code: daily.variables(0)!.valuesArray()![index],
        temperature_max: Math.round(daily.variables(1)!.valuesArray()![index]),
        temperature_min: Math.round(daily.variables(2)!.valuesArray()![index]),
      });
    }

    setDailyForecast(dailyForecastData);
    // console.log(dailyForecastData);
  };

  // For when any units are changed
  useEffect(() => {
    if(hasPageRenderedOnce.current){
      getDailyForecast(url);
    }
    return () => {};
  }, [unitSettings]);

  useEffect(() => {
    if(hasPageRenderedOnce.current){
      getDailyForecast(url);
    }  
    return () => {};
  }, [location]);

  // Init
  useEffect(() => {
    hasPageRenderedOnce.current = true;
    getDailyForecast(url);
    return () => {};
  }, []);

  return (
    <section className={styles["daily-forecast"]}>
      <h2>Daily forecast</h2>
      <div className={styles["daily-forecast__content"]}>
        {dailyForecast?.map((daily, index) => (
          <div className={styles["daily-forecast__container"]} key={index}>
            <p className="text-preset-6">{daily.day}</p>
            <img src={weatherCode(daily.weather_code)} alt="" />
            <div className={`${styles["daily-forecast__wrapper"]} text-preset-7`}>
              <p>{daily.temperature_min}&deg;C</p>
              <p>{daily.temperature_max}&deg;C</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

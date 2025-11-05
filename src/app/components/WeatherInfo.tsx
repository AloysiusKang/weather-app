import React, { useContext, useEffect, useRef, useState } from "react";
import {
  UnitSettingsContext,
  UnitSettingsContextType,
} from "../context/UnitSettingsContext";
import { fetchWeatherApi } from "openmeteo";
import { format } from "date-fns";
import commonConstant from "../common-constant.json";
import { weatherCode } from "../utility/weather-code";
import styles from "../../assets/css/WeatherInfo.module.css";
import { Location } from "./WeatherSearch";

type WeatherInfo = {
  current_date: string;
  temperature: number;
  apparent_temperature: number;
  relative_humidity: number;
  wind_speed: number;
  precipitation: number;
  weather_code: number;
};

type WeatherInfoProps = {
  location:Location,
}

export default function WeatherInfo({location}:WeatherInfoProps) {
  const url = commonConstant.OPEN_API_URL;
  const { unitSettings, setUnitSettingsContext }: UnitSettingsContextType =
    useContext(UnitSettingsContext);
  let hasPageRenderedOnce = useRef<boolean>(false);

  let weatherInfoParams = {
    latitude: location.latitude,
    longitude: location.longitude,
    daily: "weather_code",
    temperature_unit: unitSettings.temperature,
    wind_speed_unit: unitSettings.wind_speed,
    precipitation_unit: unitSettings.precipitation,
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "precipitation",
    ],
    timezone: "auto",
    forecast_days: 1,
  }

  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    current_date: "",
    temperature: 0,
    apparent_temperature: 0,
    relative_humidity: 0,
    wind_speed: 0,
    precipitation: 0,
    weather_code: 0,
  });

  const getWeatherInfo = async (url: string) => {
    const res = await fetchWeatherApi(url, weatherInfoParams);
    const response = res[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const daily = response.daily()!;
    const currDate = new Date(
      (Number(current.time()) + utcOffsetSeconds) * 1000
    );
    const weatherArray = daily.variables(0)!.valuesArray();

    const weatherData: WeatherInfo = {
      current_date: format(currDate, "EEEE, MMM d yyyy"),
      temperature: Math.round(current.variables(0)!.value()),
      apparent_temperature: Math.round(current.variables(1)!.value()),
      relative_humidity: Math.round(current.variables(2)!.value()),
      wind_speed: Math.round(current.variables(3)!.value() * 100) / 100,
      precipitation: Math.round(current.variables(4)!.value() * 100) / 100,
      weather_code: weatherArray!["0"],
    };
    setWeatherInfo(weatherData);
  };

  // For when any units are changed
  useEffect(() => {
    console.log(hasPageRenderedOnce)
    if(hasPageRenderedOnce.current){
      getWeatherInfo(url);
    }
    return () => {};
  }, [unitSettings]);
  
  useEffect(() => {
    if(hasPageRenderedOnce.current){
      getWeatherInfo(url);
    }  
    return () => {};
  }, [location]);
  
  // Init
  useEffect(() => {
    hasPageRenderedOnce.current = true;
    console.log(hasPageRenderedOnce)
    getWeatherInfo(url);
    return () => {};
  }, []);

  return (
    <section className={styles["weather-info"]}>
      <div className={`${styles["weather-info__container"]} col-span-full`}>
        <div className="">
          <h2 className="text-preset-4">{location.name}, {location.country}</h2>
          <p className="text-preset-6">{weatherInfo.current_date}</p>
        </div>
        <div className={styles["weather-info__temp"]}>
          <img src={weatherCode(weatherInfo.weather_code)} alt="" />
          <p className="text-preset-1">{weatherInfo.temperature}&deg;</p>
        </div>
      </div>
      <div className={styles["weather-info__small-container"]}>
        <p className="text-preset-6">Feels Like</p>
        <p className="text-preset-3">{weatherInfo.apparent_temperature}&deg;</p>
      </div>
      <div className={styles["weather-info__small-container"]}>
        <p className="text-preset-6">Humidity</p>
        <p className="text-preset-3">{weatherInfo.relative_humidity}%</p>
      </div>
      <div className={styles["weather-info__small-container"]}>
        <p className="text-preset-6">Wind</p>
        <p className="text-preset-3">
          {weatherInfo.wind_speed}{" "}
          {unitSettings.wind_speed === commonConstant.WINDSPEED_KM
            ? "km/h"
            : "mph"}
        </p>
      </div>
      <div className={styles["weather-info__small-container"]}>
        <p className="text-preset-6">Precipitation</p>
        <p className="text-preset-3">
          {weatherInfo.precipitation}{" "}
          {unitSettings.precipitation === commonConstant.PRECIPITATION_MM
            ? "mm"
            : "in"}
        </p>
      </div>
    </section>
  );
}

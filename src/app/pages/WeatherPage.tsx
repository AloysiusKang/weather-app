"use client";
import React, { createContext, useContext } from "react";
import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { UnitSettingsContext, UnitSettingsContextType } from "../context/UnitSettingsContext";
import commonConstant from "../common-constant.json"

type WeatherInfo = {
  current_date: string;
  temperature: number;
  apparent_temperature: number;
  relative_humidity: number;
  wind_speed: number;
  precipitation: number;
  weather_code: number;
};

type DailyForecast = {
  day: string;
  weather_code: number;
  temperature_max: number;
  temperature_min: number;
};

type HourlyForecast = {
  hour: Date;
  weather_code: number;
  temperature: number;
};

export default function WeatherPage() {
  const {unitSettings, setUnitSettingsContext}:UnitSettingsContextType = useContext(UnitSettingsContext);
  // console.log(unitSettingsContext)
  const weatherInfoParams = {
    latitude: -6.1818,
    longitude: 106.8223,
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
  };
  const dailyForecastParams = {
    latitude: -6.1818,
    longitude: 106.8223,
    temperature_unit: unitSettings.temperature,
    wind_speed_unit: unitSettings.wind_speed,
    precipitation_unit: unitSettings.precipitation,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    timezone: "auto",
    forecast_days: 7,
  };
  const hourlyForecastParams = {
    latitude: -6.1818,
    longitude: 106.8223,
    temperature_unit: unitSettings.temperature,
    wind_speed_unit: unitSettings.wind_speed,
    precipitation_unit: unitSettings.precipitation,
    hourly: ["temperature_2m", "weather_code"],
    timezone: "auto",
    start_date: "",
    end_date: "",
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  const locationParam: string = "medan";
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>();
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>();
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>();
  const [dropdownHourly, setDropdownHourly] = useState({
    day_of_forecast: "",
    is_dropdown_hidden: true
  });
  const week: Array<string> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // const getWeatherCode = (code:number) => {
  //   let weatherDescription:string = "";
  //   if (code === 0) {
  //    weatherDescription = "Clear sky"
  //   }else if(code === 1 || code === 2 || code === 3){
  //     weatherDescription = "Mainly clear, partly cloudy, and overcast"
  //   }else if(code === 45 || code === 48){
  //     weatherDescription = "Fog and depositing rime fog"
  //   }else if(code === 51 || code === 53 || code === 55){
  //     weatherDescription = "Drizzle: Light, moderate, and dense intensity"
  //   }

  //   return weatherDescription;
  // }

  // const searchLocation = async (params:string) => {
  //   setLocationUrl(`https://geocoding-api.open-meteo.com/v1/search?name=${params}`);
  // };

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

  const getWeatherInfo = async (url: string, params: Object) => {
    const res = await fetchWeatherApi(url, params);
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

  const getDailyForecast = async (url: string, params: Object) => {
    const res = await fetchWeatherApi(url, params);
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

  const getHourlyForecast = async (
    url: string,
    params: any,
    dayOfForecast: string
  ) => {
    setDropdownHourly((oldDropdown) => ({...oldDropdown, day_of_forecast: dayOfForecast}));

    // Get the date in which the user wants the hourly forecast of
    const currDate = new Date();
    for (let index = 0; index < 7; index++) {
      const dateIntervals = new Date();
      dateIntervals.setDate(currDate.getDate() + index);
      if (format(dateIntervals, "cccc") === dayOfForecast) {
        params.start_date = format(dateIntervals, "yyyy-MM-dd");
        params.end_date = format(dateIntervals, "yyyy-MM-dd");
      }
    }
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    // Get the current hour and total hours shown in website (For now 8)
    const hourly = response.hourly()!;
    let hourlyForecastData = [];
    let hourlyIntervalStart:number = new Date().getHours();
    let hourlyIntervalEnd:number = hourlyIntervalStart + commonConstant.INTERVAL_HOURLY;

    // Check if the hour forecast exceeds the day
    if(hourlyIntervalEnd > 24){
      const offset = hourlyIntervalEnd - 24;
      hourlyIntervalStart -= offset;
      hourlyIntervalEnd -= offset;
    }

    for (
      let index = hourlyIntervalStart;
      index < hourlyIntervalEnd;
      index++
    ) {
      const forecastHour = {
        hour: new Date(
          (Number(hourly.time()) + index * hourly.interval()) * 1000
        ),
        temperature: Math.round(hourly.variables(0)!.valuesArray()![index]),
        weather_code: hourly.variables(1)!.valuesArray()![index],
      };
      hourlyForecastData.push(forecastHour);
    }
    setHourlyForecast(hourlyForecastData);
    // console.log("Hourly data", hourlyForecastData)
  };

  const getDefaultHourlyForecast = async (url: string, params: any) => {
    const today: string = format(new Date(), "cccc");
    getHourlyForecast(url, params, today);
  };

  const toggleDropdown = () => {
    setDropdownHourly((oldDropdown) => {
      if(oldDropdown.is_dropdown_hidden){
        return ({
          ...oldDropdown,
          is_dropdown_hidden: false
        })
      }else{
        return ({
          ...oldDropdown,
          is_dropdown_hidden: true
        })
      }
    })
  };

  // For when any units are changed
  useEffect(() => {
    getWeatherInfo(url, weatherInfoParams);
    getDailyForecast(url, dailyForecastParams);
    getHourlyForecast(url, hourlyForecastParams, dropdownHourly.day_of_forecast);
    return () => {};
  }, [unitSettings])


  // Init
  useEffect(() => {
    getWeatherInfo(url, weatherInfoParams);
    // getLocationInfo(locationParam);
    getDailyForecast(url, dailyForecastParams);
    getDefaultHourlyForecast(url, hourlyForecastParams);
    return () => {};
  }, []);  

  return (
    <section className="home">
      <section className="cta">
        <h1 className="text-preset-2">How's the sky looking today?</h1>
        <div className="cta__search-bar">
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
      <section className="weather-info">
        <div className="weather-info__container col-span-full">
          <div className="">
            <h2 className="text-preset-4">Jakarta, Indonesia</h2>
            <p className="text-preset-6">{weatherInfo?.current_date}</p>
          </div>
          <div className="weather-info__temp">
            <img src="/assets/images/icon-sunny.webp" alt="" />
            <p className="text-preset-1">{weatherInfo?.temperature}&deg;</p>
          </div>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Feels Like</p>
          <p className="text-preset-3">
            {weatherInfo?.apparent_temperature}&deg;
          </p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Humidity</p>
          <p className="text-preset-3">{weatherInfo?.relative_humidity}%</p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Wind</p>
          <p className="text-preset-3">{weatherInfo?.wind_speed} {unitSettings.wind_speed === commonConstant.WINDSPEED_KM ? "km/h" : "mph"}</p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Precipitation</p>
          <p className="text-preset-3">{weatherInfo?.precipitation} {unitSettings.precipitation === commonConstant.PRECIPITATION_MM ? "mm" : "in"}</p>
        </div>
      </section>
      <section className="daily-forecast">
        <h2>Daily forecast</h2>
        <div className="daily-forecast__content">
          {dailyForecast?.map((daily, index) => (
            <div className="daily-forecast__container" key={index}>
              <p className="text-preset-6">{daily.day}</p>
              <img src="/assets/images/icon-storm.webp" alt="" />
              <div className="daily-forecast__wrapper text-preset-7">
                <p>{daily.temperature_min}&deg;C</p>
                <p>{daily.temperature_max}&deg;C</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="hourly-forecast">
        <div className="hourly-forecast__header">
          <h2 className="text-preset-5">Hourly forecast</h2>
          <div className="hourly-forecast__dropdown">
            <button
              type="button"
              className="text-preset-7 btn-dropdown"
              onClick={() => toggleDropdown()}
            >
              {dropdownHourly.day_of_forecast}
              <img src="/assets/images/icon-dropdown.svg" alt="" />
            </button>
            <div
              id="hourly-forecast__dropdown"
              className={`hourly-forecast__dropdown-content text-preset-7 ${dropdownHourly.is_dropdown_hidden && "hide"}`}
            >
              {week.map((day, index) => (
                <p
                  onClick={() => {
                    toggleDropdown();
                    return getHourlyForecast(url, hourlyForecastParams, day);
                  }}
                  className={
                    day === dropdownHourly.day_of_forecast
                      ? "hourly-forecast__dropdown-active"
                      : ""
                  }
                  key={index}
                >
                  {day}
                </p>
              ))}
            </div>
          </div>
        </div>
        {hourlyForecast?.map((hourly, index) => (
          <div className="hourly-forecast__container" key={index}>
            <img src="/assets/images/icon-snow.webp" alt="" />
            <p>{format(hourly.hour, "hh aa")}</p>
            <p>{hourly.temperature}&deg;C</p>
          </div>
        ))}
      </section>
    </section>
  );
}

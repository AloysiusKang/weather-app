"use client";

import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

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

export default function Home() {
  const weatherInfoParams = {
    latitude: -6.1818,
    longitude: 106.8223,
    daily: "weather_code",
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
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    timezone: "auto",
    forecast_days: 7
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  const locationParam: string = "medan";
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>();
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>();

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
    const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${params}`);
    console.log(res.data.results);
  };

  const getWeatherInfo = async (url: string, params: Object) => {
    const res = await fetchWeatherApi(url, params);
    const response = res[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const daily = response.daily()!;
    const currDate = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);
    const weatherArray = daily.variables(0)!.valuesArray()

    const weatherData: WeatherInfo = {
      current_date: format(currDate, "EEEE, MMM d yyyy"),
      temperature: Math.round(current.variables(0)!.value()),
      apparent_temperature: Math.round(current.variables(1)!.value()),
      relative_humidity: Math.round(current.variables(2)!.value()),
      wind_speed: Math.round(current.variables(3)!.value() * 100) / 100,
      precipitation: Math.round(current.variables(4)!.value() * 100) / 100,
      weather_code: weatherArray!["0"],
    };

    setWeatherInfo(weatherData)
  };

  const getDailyForecast = async (url: string, params: Object) => {
    const res = await fetchWeatherApi(url, params);
    const response = res[0];
    const daily = response.daily()!;

    let dailyForecastData = [];
    for (let index = 0; index < dailyForecastParams.forecast_days; index++) {
      const currDate = new Date();
      const forecastDay = new Date(currDate);
      forecastDay.setDate(currDate.getDate() + index);

      dailyForecastData.push({
        day: format(forecastDay, "EEE"),
        weather_code: daily.variables(0)!.valuesArray()![index],
        temperature_max: Math.round(daily.variables(1)!.valuesArray()![index]),
        temperature_min: Math.round(daily.variables(2)!.valuesArray()![index]),
      });
    };

    setDailyForecast(dailyForecastData);

    console.log(dailyForecastData);
  };

  useEffect(() => {
    getWeatherInfo(url, weatherInfoParams);
    // getLocationInfo(locationParam);
    getDailyForecast(url, dailyForecastParams);
    return () => { };
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
            <p className="text-preset-1">{weatherInfo?.temperature}</p>
          </div>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Feels Like</p>
          <p className="text-preset-3">{weatherInfo?.apparent_temperature}</p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Humidity</p>
          <p className="text-preset-3">{weatherInfo?.relative_humidity}%</p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Wind</p>
          <p className="text-preset-3">{weatherInfo?.wind_speed} km/h</p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Precipitation</p>
          <p className="text-preset-3">{weatherInfo?.precipitation} mm</p>
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
                <p>{daily.temperature_max}</p>
                <p>{daily.temperature_min}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="hourly-forecast">
        <div className="hourly-forecast__header">
          <h2 className="text-preset-5">Hourly forecast</h2>
          <button type="button" className="text-preset-7 btn-dropdown">
            Tuesday
            <img src="/assets/images/icon-dropdown.svg" alt="" />
          </button>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>3 PM</p>
          <p>20</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>4 PM</p>
          <p>20</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>5 PM</p>
          <p>20</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>6 PM</p>
          <p>19</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>7 PM</p>
          <p>18</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>8 PM</p>
          <p>18</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>9 PM</p>
          <p>17</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>10 PM</p>
          <p>17</p>
        </div>
      </section>
    </section>
  );
}

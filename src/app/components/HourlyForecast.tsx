import React, { useContext, useEffect, useRef, useState } from 'react'
import { weatherCode } from "../utility/weather-code";
import { UnitSettingsContext, UnitSettingsContextType } from '../context/UnitSettingsContext';
import { format } from 'date-fns';
import { fetchWeatherApi } from 'openmeteo';
import commonConstant from "../common-constant.json"
import styles from "../../assets/css/HourlyForecast.module.css"
import { Location } from './WeatherSearch';

type HourlyForecast = {
  hour: Date;
  weather_code: number;
  temperature: number;
};

type HourlyForecastProps = {
    location:Location
}

export default function HourlyForecast({location}:HourlyForecastProps) {
    const url = commonConstant.OPEN_API_URL;
    const hasPageRenderedOnce = useRef<Boolean>(false);
    const {unitSettings, setUnitSettingsContext}:UnitSettingsContextType = useContext(UnitSettingsContext);
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>();
    const hourlyForecastParams = {
        latitude: location.latitude,
        longitude: location.longitude,
        temperature_unit: unitSettings.temperature,
        wind_speed_unit: unitSettings.wind_speed,
        precipitation_unit: unitSettings.precipitation,
        hourly: ["temperature_2m", "weather_code"],
        timezone: "auto",
        start_date: "",
        end_date: "",
      };

    // Dropdown
    const [dropdownHourly, setDropdownHourly] = useState({
        day_of_forecast: "",
        is_dropdown_hidden: true
    });
    const week: Array<string> = commonConstant.DROPDOWN_WEEK;

    const getHourlyForecast = async (
        url: string,
        dayOfForecast: string
    ) => {
        setDropdownHourly((oldDropdown) => ({...oldDropdown, day_of_forecast: dayOfForecast}));

        // Get the date in which the user wants the hourly forecast of
        const currDate = new Date();
        for (let index = 0; index < 7; index++) {
        const dateIntervals = new Date();
        dateIntervals.setDate(currDate.getDate() + index);
        if (format(dateIntervals, "cccc") === dayOfForecast) {
            hourlyForecastParams.start_date = format(dateIntervals, "yyyy-MM-dd");
            hourlyForecastParams.end_date = format(dateIntervals, "yyyy-MM-dd");
        }
        }
        const responses = await fetchWeatherApi(url, hourlyForecastParams);
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

    const getDefaultHourlyForecast = async (url: string) => {
        const today: string = format(new Date(), "cccc");
        getHourlyForecast(url, today);
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
        if(hasPageRenderedOnce.current){
            getHourlyForecast(url, dropdownHourly.day_of_forecast);
        }
        return () => {};
    }, [unitSettings])

    useEffect(() => {
        if(hasPageRenderedOnce.current){
            getDefaultHourlyForecast(url);
        }  
        return () => {};
    }, [location]);

    // Init
    useEffect(() => {
        hasPageRenderedOnce.current = true;
        getDefaultHourlyForecast(url);
        return () => {};
    }, []);

  return (
    <section className={styles["hourly-forecast"]}>
        <div className={styles["hourly-forecast__header"]}>
            <h2 className="text-preset-5">Hourly forecast</h2>
            <div className={styles["hourly-forecast__dropdown"]}>
            <button
                type="button"
                className={`text-preset-7 ${styles["btn-dropdown"]}`}
                onClick={() => toggleDropdown()}
            >
                {dropdownHourly.day_of_forecast}
                <img src="/assets/images/icon-dropdown.svg" alt="" />
            </button>
            <div
                id="hourly-forecast__dropdown"
                className={`${styles["hourly-forecast__dropdown-content"]} text-preset-7 ${dropdownHourly.is_dropdown_hidden && "hide"}`}
            >
                {week.map((day, index) => (
                <p
                    onClick={() => {
                    toggleDropdown();
                    return getHourlyForecast(url, day);
                    }}
                    className={ day === dropdownHourly.day_of_forecast ? (styles["hourly-forecast__dropdown-active"]) : ""}
                    key={index}
                >
                    {day}
                </p>
                ))}
            </div>
            </div>
        </div>
        {hourlyForecast?.map((hourly, index) => (
            <div className={styles["hourly-forecast__container"]} key={index}>
            <img src={weatherCode(hourly.weather_code)} alt="" />
            <p>{format(hourly.hour, "hh aa")}</p>
            <p>{hourly.temperature}&deg;C</p>
            </div>
        ))}
    </section>
  )
}

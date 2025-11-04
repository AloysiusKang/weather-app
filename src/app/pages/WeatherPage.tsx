"use client";
import React from "react";
import { UnitSettingsContext, UnitSettingsContextType } from "../context/UnitSettingsContext";
import WeatherSearch from "../components/WeatherSearch";
import WeatherInfo from "../components/WeatherInfo";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import styles from "../../assets/css/WeatherPage.module.css";


export default function WeatherPage() {
  return (
    <section className={styles["home"]}>
      <WeatherSearch/>
      <WeatherInfo/>
      <DailyForecast/>
      <HourlyForecast/>
    </section>
  );
}
